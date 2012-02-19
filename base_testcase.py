from unittest import TestCase
import urllib2
import json
import StringIO

class BaseTestCase(TestCase):

    def post(self, url, data):
        request = urllib2.Request(url, data=json.dumps(data),
            headers={'Content-Type': 'application/json'})
        return urllib2.urlopen(request)
