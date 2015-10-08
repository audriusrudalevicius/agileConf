# -*- coding: utf-8 -*-
__author__ = 'audrius'

import tornado.ioloop
import tornado.web
import sockjs.tornado
from server import config
from server import speed
from threading import Thread

class BikeConnection(sockjs.tornado.SockJSConnection):
    clients = set()

    def on_open(self, info):
        # Add client to the clients list
        self.clients.add(self)

    def on_message(self, message):
        pass

    def on_close(self):
        self.clients.remove(self)

def CastConnected(c):
    logging.debug('Broadcasting speed to public')
    BikeChallengeRouter.broadcast(BikeConnection.clients, {'connected': True})

def Cast(speed):
    logging.debug('Broadcasting speed to public')
    BikeChallengeRouter.broadcast(BikeConnection.clients, {'speed': speed.getSpeed(), 'revolutions':speed.getRev()})

if __name__ == "__main__":
    import logging
    logging.getLogger().setLevel(logging.DEBUG)

    if config.MOCK:
        speedListener = speed.MockedSpeed()
    else:
        speedListener = speed.Speed()

    BikeChallengeRouter = sockjs.tornado.SockJSRouter(BikeConnection, '/bike')

    speedListener.em().on("speed", Cast)
    speedListener.em().on("connected", CastConnected)

    app = tornado.web.Application(
        BikeChallengeRouter.urls
    )

    app.listen(config.PORT)
    logging.info('Server started on localhost: %s ' % config.PORT)

    try:
        speedListener.start()
        tornado.ioloop.IOLoop.instance().start()
    finally:
        logging.info('Stopping device')
        speedListener.stop()