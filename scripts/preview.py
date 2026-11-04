"""Local preview that always serves the latest saved files."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import os

class PreviewHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if 'If-Modified-Since' in self.headers:
            del self.headers['If-Modified-Since']
        super().do_GET()

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

if __name__ == '__main__':
    os.chdir(Path(__file__).resolve().parent.parent)
    ThreadingHTTPServer(('', 8765), PreviewHandler).serve_forever()
