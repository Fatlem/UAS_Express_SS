const fs = require("fs");
const csvParser = require("csv-parser");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function importCSV() {
    const data = [];
    fs.createReadStream("member-data.csv")
        .pipe(csvParser())
        .on("data", (row) => {
            data.push(row);
        })
        .on("end", async () => {
            console.log("CSV file successfully processed.");

            // Lakukan import data ke database
            try {
                for (const record of data) {
                    await prisma.courseMember.create({
                        data: {
                            courseId:parseInt(record.course_id),
                            userId:parseInt(record.user_id),
                            roles:record.roles

                            //await prisma.Course.create({
                            // name:record.name,
                            // url: record.url,
                            // description: record.description,
                            // site: record.site,
                            // price: parseInt(record.price),
                            // teacherId: parseInt(record.teacher),

                            //await prisma.userData.create({
                            // firstName: record.firstname,
                            // lastName: record.lastname,
                            // email:record.email,
                            // password:record.password,
                            // username: record.username
                        },
                    });
                }
                console.log("Data berhasil diimpor ke database.");
            } catch (error) {
                console.error("Error importing data:", error);
            } finally {
                await prisma.$disconnect();
            }
        });
}

importCSV();
