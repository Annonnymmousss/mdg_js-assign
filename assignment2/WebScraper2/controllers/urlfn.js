const cheerio = require('cheerio');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();
const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINIAPIKEY});
async function web_scrape(url) {
    try {    
        const { data } = await axios.get(url);       
        const $ = cheerio.load(data);
        // console.log(data)
        const title = $('title').text();
        const imageUrls = [];  
        $('img').each((i, el) => {
            const src = $(el).attr('src');
            if (src) imageUrls.push(src);
        });  
        const all_links = [];
        $('a').each((i, el) => {
            const href = $(el).attr('href');
            const text = $(el).text().trim();
            if (href) {
                all_links.push({ href, text });
            }
        });
        const headings = [];
        ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(tag => {
            $(tag).each((i, el) => {
                const headingText = $(el).text().trim();
                headings.push({ level: tag.toUpperCase(), text: headingText });
            });
        });
        
        console.log(title , headings , all_links , imageUrls)
        
      } catch (error) {
        console.error('Error scraping the page:', error);
        res.status(500).send('Error scraping the page');
      }   
      
}


async function suggestion(data) {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `${data} read the entire data , title , images and related to this suggest some information which i will direct further. I want to make graphs related to the above data for that i want values for scales on x axis and y axis and the title of the graph . suggest me some logical , relatable pairs of x axis and y axis in json format . only give the title and the json data except that not a single word. suggest more that 5 such response.if output or any this is not provided n wikipidea link search if from internet and then provide something.Give values on the basis of headings(h1,h2,h3,h4,h5,h6) of the data provided majorly and use rest as just helping resources. provide values for x axis and y axis.and must give values. give the output in json format`,
    });
    const output = (response.text) ;
    // const output = response.json.parse();
    return output;

    // console.log(output)
    // res.send(response.text)
}
  

function generateRandomIP() {
    return Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join('.');
  }



module.exports= {web_scrape, suggestion , generateRandomIP}