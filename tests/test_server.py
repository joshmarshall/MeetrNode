from unittest import TestCase
import urllib2

class TestServer(TestCase):

    def test_root(self):
        response = urllib2.urlopen("http://localhost:3000/")
        self.assertEqual(response.getcode(), 200)
        self.assertEqual(response.read(), "Hello World")


