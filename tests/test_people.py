import urllib2
import json
from base_testcase import BaseTestCase

class TestPeople(BaseTestCase):

    def test_get_people(self):
        response = urllib2.urlopen('http://localhost:3000/people')
        self.assertEqual(response.getcode(), 200)
        self.assertEqual(response.info().getheader('Content-type'),
            'application/json; charset=utf-8')
        data = json.loads(response.read())
        self.assertTrue('people' in data)
        self.assertTrue(type(data['people']), list)

    def test_post_people(self):
        response = self.post('http://localhost:3000/people',
            {'uid': 1, 'name': 'Name'})
        self.assertEqual(response.getcode(), 200)
