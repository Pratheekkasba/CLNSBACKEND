const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
    console.log("Seeding internship postings...");

    await db.internshipPosting.createMany({
        data: [
            {
                title: "Legal Research Intern",
                company: "Global Law Partners",
                location: "Remote",
                description: "Assist senior attorneys with case research and documentation.",
                type: "Remote",
            },
            {
                title: "Summer Associate",
                company: "Davis & Associates",
                location: "New York, NY",
                description: "Join our summer program for hands-on litigation experience.",
                type: "On-site",
            },
            {
                title: "Paralegal Intern",
                company: "Tech Legal Corp",
                location: "San Francisco, CA",
                description: "Support our IP team with patent filings and research.",
                type: "Hybrid",
            },
            {
                title: "Civil Rights Fellow",
                company: "Justice For All",
                location: "Washington, DC",
                description: "Work on high-impact civil rights cases.",
                type: "On-site",
            },
            {
                title: "Corporate Law Intern",
                company: "FinTech Legal",
                location: "Remote",
                description: "Learn about regulatory compliance in the fintech sector.",
                type: "Remote",
            },
        ],
    });

    console.log("Postings seeded.");
}

main()
    .then(async () => {
        await db.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await db.$disconnect();
        process.exit(1);
    });
