var router = {
    'hello': (data, callback) => { callback(200,
        data.method === 'get' ? { 'Hello world GET content': 'this course is amazing!' } : {'Hello world POST (or else) content': 'this course is REALLY amazing!'}); },
    'notFound': (data, callback) => { callback(404); }
};

module.exports = router;