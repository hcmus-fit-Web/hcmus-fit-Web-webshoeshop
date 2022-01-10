
const Index = require('./indexModel');
const PAGE_SIZE = 3;

exports.list = (page) => {

    return new Promise((resolve,reject) => {

        if (page) {
            page = parseInt(page);
            if(page<1) page = 1;
            var skip = (page - 1) * PAGE_SIZE;
            Index.find({}).skip(skip).limit(PAGE_SIZE).lean()
                .then(data => {

                    resolve(data)

                })
                .catch(err => reject(new Error(err)))
        } else {

            page = 1;
            var skip = (page - 1) * PAGE_SIZE;
            Index.find({}).skip(skip).limit(PAGE_SIZE).lean()
                .then(data => {

                    resolve(data)

                })
                .catch(err => reject(new Error(err)))
        }
    })
}