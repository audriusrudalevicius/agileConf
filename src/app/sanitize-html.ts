import * as sanitizeHtml from 'sanitize-html';

export class SanitizeHtmlValueConverter {
    toView(untrustedHtml) {
        return sanitizeHtml(untrustedHtml);
    }
}