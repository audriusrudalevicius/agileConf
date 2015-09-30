#!/usr/bin/python

import sys
import time

from ant.core import driver, node, event, message
from ant.core.constants import *
from pymitter import EventEmitter
from config import *
import logging

logging.getLogger().setLevel(logging.DEBUG)

def convertSB(raw):
    value = int(raw[1]) << 8
    value += int(raw[0])
    return value

class SpeedEvent():
    def __init__(self, rev, speed):
        self.rev = rev
        self.speed = speed

    def getSpeed(self):
        return self.speed

    def getRev(self):
        return self.rev


class SpeedListener(event.EventCallback):
    lastTime = None
    lastRevolutions = None

    def calcSpeed(self, time, revolutions):
        if self.lastTime is None:
            return None

        if time < self.lastTime:
            time += 64 * 1024

        if revolutions < self.lastRevolutions:
            revolutions += 65535

        return (revolutions - self.lastRevolutions) * 1024.0 * CIRCUMFERENCE / (time - self.lastTime)

    def process(self, msg):
        if isinstance(msg, message.ChannelBroadcastDataMessage):
            page = msg.payload[1] & 0x7F
            if page != 0 and page != 5:
                return

            if page == 5:
                stopped = (msg.payload[2] & 1 == 1)
                if stopped:
                    print self.lastRevolutions, 0

            eventTime = convertSB(msg.payload[5:7])
            if eventTime == self.lastTime:
                return

            revolutions = convertSB(msg.payload[7:9])

            speed = self.calcSpeed(eventTime, revolutions)

            logging.debug('Got event Revolutions: %s Speed: %s', revolutions, speed)

            self.ee.emit("speed", SpeedEvent(revolutions, speed))

            self.lastTime = eventTime
            self.lastRevolutions = revolutions

    def setEM(self, ee):
        self.ee = ee

class MockedSpeed():
    def __init__(self):
        self.ee = EventEmitter()
        self.running = True
    def em(self):
        return self.ee

    def start(self):
        logging.debug('Starting bike events listener')

        try:
            logging.info("Listening for device events...")
            while self.running:
                self.ee.emit("speed", SpeedEvent(10, 2.3456))
                time.sleep(5)
        finally:
            self.running = False

    def stop(self):
        self.running = False


class Speed():

    def __init__(self):
        self.sl = SpeedListener()
        self.ee = EventEmitter()
        self.sl.setEM(self.ee)
        self.channel = None
        self.running = True

    def em(self):
        return self.ee

    def start(self):
        logging.debug('Starting bike events listener')

        # Initialize
        stick = driver.USB1Driver(SERIAL, log=LOG, debug=DEBUG)
        self.antnode = node.Node(stick)
        self.antnode.start()
        self.antnode.registerEventListener(self.sl)

        # Set network key
        network = node.Network(key=NETKEY, name='N:ANT+')
        self.antnode.setNetworkKey(0, network)

        # Get the first unused channel. Returns an instance of the node.Channel class.
        self.channel = self.antnode.getFreeChannel()

        # Initialize it as a receiving channel using our network key
        self.channel.assign(network, CHANNEL_TYPE_TWOWAY_RECEIVE)

        # Now set the channel id for pairing with an ANT+ HR monitor
        self.channel.setID(123, 0, 0)

        # Listen forever and ever (not really, but for a long time)
        self.channel.searchTimeout = TIMEOUT_NEVER

        # We want a ~4.06 Hz transmission period
        self.channel.period = 8118

        # And ANT frequency 57
        self.channel.frequency = 57

        self.evm = event.EventMachine(driver)

        self.channel.open()
        self.ee.emit("connected", True)

    def stop(self):
        logging.info("Closing devices finally")
        if self.channel is None:L
            pass

        # Shutdown channel
        self.channel.close()
        self.channel.unassign()

        # Shutdown
        self.antnode.stop()
