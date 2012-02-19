import urllib2
from base_testcase import BaseTestCase

class TestServer(BaseTestCase):

    def test_root(self):
        response = urllib2.urlopen("http://localhost:3000/")
        self.assertEqual(response.getcode(), 200)
        self.assertEqual(response.read(), "Hello World")


