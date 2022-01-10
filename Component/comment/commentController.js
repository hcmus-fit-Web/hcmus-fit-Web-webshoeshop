const singleService = require('../Single/singleService');
const Comment = require('../comment/commentModel');

exports.postComment = async (req,res)=>{
    if (!req.user){
        res.status(401).json({
            message:'Unauthorized'
        })
    }

    const comments = await singleService.postComment(req.user.id,req.params.id,req.body.content);
    res.status(201).json(comments);
}

const PAGE_SIZE = 4;
exports.list = (page,query) => {

    return new Promise((resolve,reject) => {
        if (page) {
            page = parseInt(page);
            if(page < 1) page = 1;
            var skip = (page - 1) * PAGE_SIZE;
            Comment.find({}).skip(skip).limit(PAGE_SIZE).lean()
                .then(data => {
                    resolve(data)
                })
                .catch(err => reject(new Error(err)))
        } else {

            page = 1;
            var skip = (page - 1) * PAGE_SIZE;
            Comment.find({}).skip(skip).limit(PAGE_SIZE).lean()
                .then(data => {
                    resolve(data)
                })
                .catch(err => reject(new Error(err)))
        }
    })
}
