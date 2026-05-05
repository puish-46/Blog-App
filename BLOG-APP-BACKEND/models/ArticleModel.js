import { Schema,model } from "mongoose";

const CommentSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:[true,"User ID required"]
    },
    comment:{
        type:String,
        required:[true,"Enter the comment"]
    }
});


const ArticleSchema=new Schema({
    author:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:[true,"Author ID is required"]
    },
    title:{
        type:String,
        required:[true,"Title is required"]
    },
    category:{
        type:String,
        required:[true,"Category is required"]
    },
    content:{
        type:String,
        required:[true,"Content is required"]
    },
    comments:[{type:CommentSchema,default:[]}],
    isArticleActive:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true,
    versionKey:false,
    strict:"throw"
});

export const ArticleModel=model("article",ArticleSchema);