from unittest import TestCase
import urllib2
import json

class TestServer(TestCase):

    def test_people(self):
        response = urllib2.urlopen('http://localhost:3000/people')
        self.assertEqual(response.getcode(), 200)
        self.assertEqual(response.info().getheader('Content-type'),
            'application/json; charset=utf-8')
        data = json.loads(response.read())
        self.assertTrue('people' in data)
        self.assertTrue(type(data['people']), list)
