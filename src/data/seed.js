const fs = require('fs');  
const { PrismaClient } = require('@prisma/client');  
  
const prisma = new PrismaClient();  
  
async function main() {  
    // Baca data dari fail JSON  
    const data = JSON.parse(fs.readFileSync('contents.json', 'utf8'));  
  
    // Masukkan data ke dalam pangkalan data  
    for (const item of data) {  
        await prisma.courseContent.create({  
            data: {  
                name: item.name,  
                description: item.description,  
                videoUrl: item.videoUrl,  
                courseId: item.course_id,  
            },  
        });  
    }  
  
    console.log('Data telah dimasukkan ke dalam pangkalan data.');  
}  
  
main()  
    .catch(e => {  
        console.error(e);  
    })  
    .finally(async () => {  
        await prisma.$disconnect();  
    });  
