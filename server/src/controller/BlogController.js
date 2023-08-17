const BlogModel = require ("../models/BlogModel.js")

exports.createBlog = async (req, res) => {

    try {
        const blog = await BlogModel.create(req.body);
        res.status(200).json({
            status: "success",
            data: {
                blog,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err,
        });
    }
}

exports.getBlogs = async (req, res) => {
    try{
        const blogs = await BlogModel.find();
        return res.status(200).json({
            data: blogs
        })
    }

    catch(err){
        return res.status(400).json({
            message: err
        })
    }
}


exports.getBlogById = async (req, res) => {
    try{
          const {id } = req.params;
          const blogs = await BlogModel.findById(id);
          if(!blogs){
              return res.status(404).json({
                    message: "Blog not found"
              })

          }
        return res.status(200).json({ data: blogs })
    }
    catch (err) {
        return res.status(400).json({
            message: err
        })
    }
}




exports.updateBlog = async (req, res) => {
    try{
        const {id } = req.params;
        const reqBody = req.body;

        const blog = await BlogModel.findByIdAndUpdate(id,reqBody)

        return res.status(200).json({
            data: blog
        })
    }
    catch (err) {
        return res.status(400).json({
            message: err
        })
    }
}

exports.deleteBlog = async (req, res) => {
    try{
        const {id } = req.params;
        const blog = await BlogModel.findByIdAndDelete(id)
        return res.status(200).json({
            data: blog
        })

    }
    catch (err) {
        return res.status(400).json({
            message: err
        })
    }
}

