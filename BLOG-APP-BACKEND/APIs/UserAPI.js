import exp from 'express'
import { verifyToken } from '../middlewares/verifyToken.js'
import { ArticleModel } from '../models/ArticleModel.js'
export const userApp=exp()



//read articles of all authors
userApp.get("/articles",verifyToken("USER"),async(req,res)=>{
    //read article
    const articleList=await ArticleModel.find({isArticleActive:true})
    //send response
    res.status(200).json({message:"articles",payload:articleList})
})

//add comments to an article
userApp.put("/articles",verifyToken("USER"),async(req,res)=>{
    //get body from req
    const {articleId,comment}=req.body
    //check article
    const articleDoc=await ArticleModel.findOne({_id:articleId,isArticleActive:true}).populate("comments.user");
    //if article not found
    if(!articleDoc){
        return res.status(404).json({message:"Article not found"})
    }
    //get user id
    const userId=req.user?.id
    //add comment to the comments array of articleDocument
    articleDoc.comments.push({user:userId,comment:comment})
    //save
    await articleDoc.save()
    //send res
    res.status(200).json({message:"Comment added successfully",payload:articleDoc})
})