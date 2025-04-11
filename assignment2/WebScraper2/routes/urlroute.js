const{ Router} = require("express");
const router = Router();

const cheerio = require('cheerio');
const {web_scrape, suggestion} = require("../controllers/urlfn");
const axios = require('axios');



router.get("/" , (req,res)=>{
    res.render("index")
});

router.post("/" , (req,res)=>{
    const response = req.body.url;
    console.log(response);
    const scraped = web_scrape(response)
    const output = suggestion(scraped)
    
    console.log(output)

    res.send();


});




module.exports=router;