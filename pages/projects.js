import { useState, useEffect } from "react";
import { Layout, Head, ProjectBlock, EarningsProgress } from "../components/";
import supabase from "../lib/supabase";

const Projects = () => {
    const [revenue, setRevenue] = useState(0);
    const [resources, setResources] = useState({
        weeklydeals: 0,
        notes: 0,
    });

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        const { data: income } = await supabase.from("income").select("*");

        income.forEach((rev) => {
            switch (rev.resource) {
                case "Notion Template": {
                    resources.notes += rev.amount;
                    break;
                }
                case "WeeklyDeals.dev": {
                    resources.weeklydeals += rev.amount;
                    break;
                }
            }
        });

        const revenue = income.reduce((acc, rev) => (acc += rev.amount), 0);

        setRevenue(revenue);
        setResources(resources);
    }

    return (
        <Layout>
            <Head
                title={"Projects"}
                description={"Projects built during the $0 to $100k Challenge"}
                url="https://makemoney.dev/projects"
                image="https://makemoney.dev/images/homepage.png"
            />
            <div className="flex flex-col items-center text-white">
                <EarningsProgress revenue={revenue} />
                <h1 className="text-5xl lg:text-6xl font-bold mb-8 text-center">
                    Projects
                </h1>
                <h4 className="text-2xl text-center">
                    These projects were built during the $0 to $100k Challenge.
                </h4>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
                    <ProjectBlock
                        title="$0 to $100k Challenge Notes"
                        image_url="/images/projects/notes.png"
                        link="https://gum.co/0-to-100k-notes"
                        revenue={resources.notes}
                    />
                    <ProjectBlock
                        title="Weekly Deals for Devs"
                        image_url="/images/projects/wdd.png"
                        link="https://weeklydeals.dev/"
                        revenue={resources.weeklydeals}
                    />
                    <ProjectBlock
                        title="Live AMA with industry experts"
                        image_url="/images/projects/live-ama.png"
                        link="https://live-ama.com/"
                        revenue={0}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default Projects;
