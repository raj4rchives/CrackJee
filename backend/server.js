// NoteNest AI backend starter
// Install: npm install
// Run: npm start
// Put your AI API key in .env. Never expose it in frontend JS.
const express=require("express");
const multer=require("multer");
const path=require("path");
const upload=multer({dest:"uploads/"});
const app=express();
app.use(express.static(path.join(__dirname,"..")));
app.post("/api/generate",upload.single("file"),async(req,res)=>{
  // TODO: Add PDF text extraction/OCR and your chosen AI provider here.
  // req.file.path = uploaded file
  // req.body.type = Short Notes / Formula Sheet / Cheat Sheet / One Page Revision
  res.status(501).json({error:"AI backend not configured"});
});
app.listen(process.env.PORT||3000,()=>console.log("NoteNest running on http://localhost:3000"));
