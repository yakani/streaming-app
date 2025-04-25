const asyncHandler = require("express-async-handler");
const Comment = require("../models/Comments.js");
const Insert  =  asyncHandler(async (req, res) => {
  const { file_id,  comment } = req.body;
  const user_id = req.user._id;
  if (!file_id  || !comment) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  try {
    
  
  const newComment = await Comment.create({
    file_id,
    user_id,
    comment,
  });
  res.status(201).json(newComment);
} catch (error) {
  res.status(400).json({message:error});
  console.log(error);
}
});
const GetAll = asyncHandler(async (req, res) => {
    const file_id  = req.params.id;
    const comments = await Comment.find({ file_id }).populate("user_id", [
        "name",
        "email",
        "avatar",
    ]);
    res.status(200).json(comments);
    });
module.exports = {
GetAll,
Insert
}
