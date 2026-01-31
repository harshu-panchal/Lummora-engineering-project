import { Component, HardHat, Wrench, BarChart3, ShieldCheck, Users, Globe, Award, Leaf } from 'lucide-react';

export const companyData = {
    name: "LUMMORA Engineering Projects Private Limited",
    shortName: "LUMMORA",
    tagline: "Building Excellence, Engineering Success",
    description: "At LUMMORA Engineering Projects Private Limited, we deliver high-quality construction and mechanical engineering solutions that transform vision into reality. Our expertise, precision, and commitment to excellence make us a trusted partner across commercial, industrial, and infrastructure sectors.",
    aboutShort: "LUMMORA Engineering Projects Private Limited stands at the forefront of construction and mechanical engineering innovation. With decades of combined professional expertise, we deliver comprehensive solutions that transform complex engineering challenges into successful project outcomes.",
    vision: "We strive to become the most trusted partner in engineering excellence by combining cutting-edge technology with proven methodologies. Our multidisciplinary approach integrates construction management, mechanical systems design, and project execution to deliver seamless, end-to-end solutions for our clients.",
    contact: {
        phone: "+91 91574 73449, +91 63889 47064",
        email: "lumora.aura369@gmail.com",
        address: "Reg. Office: [City, State, India]",
        linkedin: "https://linkedin.com/company/lummora-engineering",
    },
    stats: [
        { label: "Projects Completed", value: "150+" },
        { label: "Client Satisfaction", value: "98%" },
        { label: "Combined Industry Experience", value: "14+" },
        { label: "Safety Incidents", value: "0" },
    ]
};

export const services = [
    {
        id: "construction",
        title: "Construction Services",
        icon: HardHat,
        image: "/modern_building.png",
        description: "We provide comprehensive construction services tailored to meet the needs of modern infrastructure and industrial development.",
        details: [
            "Commercial building construction",
            "Industrial facility development",
            "Infrastructure projects",
            "Renovation and refurbishment"
        ]
    },
    {
        id: "mechanical",
        title: "Mechanical Engineering",
        icon: Wrench,
        image: "/smart_engineering.png",
        description: "Our mechanical engineering expertise ensures efficiency, durability, and compliance with industry standards.",
        details: [
            "Pipeline systems",
            "Blasting and painting",
            "Piping fabrication and erection",
            "Industrial equipment installation",
            "Maintenance and servicing"
        ]
    },
    {
        id: "project-management",
        title: "Project Management",
        icon: BarChart3,
        image: "/cad_design.png",
        description: "Our structured project management approach ensures timely delivery and cost control.",
        details: [
            "Comprehensive project planning",
            "Cost estimation and budgeting",
            "Timeline management",
            "Quality control and assurance",
            "PMC & CSM services"
        ]
    }
];

export const engineeringExcellence = [
    {
        title: "Advanced Design Capabilities",
        description: "We utilize state-of-the-art CAD and BIM software to develop precise, optimized designs. Advanced simulation tools ensure structural integrity and system efficiency before construction begins.",
        icon: Component,
        image: "/cad_design.png"
    },
    {
        title: "Industry Compliance",
        description: "All projects strictly adhere to international standards including ISO 9001:2015, ISO 14001, and relevant local building codes and regulations.",
        icon: ShieldCheck,
        image: "/quality_check.png"
    },
    {
        title: "Technical Innovation",
        description: "We continuously invest in emerging technologies, incorporating sustainable practices, energy-efficient systems, and smart building solutions.",
        icon: Globe,
        image: "/smart_engineering.png"
    },
    {
        title: "Safety Excellence",
        description: "Our ISO 45001 compliant safety management systems protect our workforce and stakeholders throughout every project phase.",
        icon: Award,
        image: "/safety_gear.png"
    }
];

export const qualityStandards = [
    {
        code: "ISO 9001:2015",
        title: "Quality Management System",
        description: "Ensuring consistent quality in products and services."
    },
    {
        code: "ISO 14001:2015",
        title: "Environmental Management System",
        description: "Commitment to sustainable and environmentally responsible practices."
    },
    {
        code: "ISO 45001:2018",
        title: "Occupational Health & Safety Management",
        description: "Prioritizing the health, safety, and well-being of our team and partners."
    }
];

export const testimonials = [
    {
        quote: "LUMMORA delivered our 50,000 sq. ft. manufacturing facility three weeks ahead of schedule. Their mechanical systems expertise and attention to detail were exceptional.",
        author: "Manufacturing Sector Leader",
        position: "Client",
        project: "Industrial Facility"
    },
    {
        quote: "Working with LUMMORA was seamless. Their project management capabilities ensured smooth execution. We have since partnered on multiple additional projects.",
        author: "Commercial Property Developer",
        position: "Client",
        project: "Commercial Complex"
    }
];

export const whyChooseUs = [
    {
        title: "Proven Track Record",
        description: "Proven track record with consistent excellence across multiple sectors."
    },
    {
        title: "Integrated Solutions",
        description: "Integrated construction and mechanical solutions for seamless project manufacturing."
    },
    {
        title: "Quality Commitment",
        description: "ISO-certified quality processes ensuring zero compromise on material and workmanship."
    },
    {
        title: "Strong Safety Culture",
        description: "Safety is our top priority. Every team member returns home safely, every single day."
    },
    {
        title: "Competitive Value", // Added based on prompt
        description: "Competitive value without compromising quality."
    },
    {
        title: "Timely Delivery", // Added based on prompt
        description: "On-time project delivery."
    }
];

export const engagementProcess = [
    {
        step: 1,
        title: "Initial Consultation",
        description: "We discuss your requirements, scope, and objectives."
    },
    {
        step: 2,
        title: "Proposal Development",
        description: "We provide a detailed technical and commercial proposal."
    },
    {
        step: 3,
        title: "Project Execution",
        description: "Our expert teams mobilize to execute the project with precision."
    },
    {
        step: 4,
        title: "Successful Handover",
        description: "Commissioning, final handover, and ongoing maintenance support."
    }
];

export const portfolio = [
    {
        id: 1,
        name: "Mega Industrial Complex",
        category: "Industrial",
        client: "Global Mfg Corp",
        location: "Gujarat, India",
        image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&q=80&w=1000",
        stats: { area: "500,000 sq.ft", duration: "18 Months" }
    },
    {
        id: 2,
        name: "City Metro Pipeline",
        category: "Infrastructure",
        client: "Metro Rail Corp",
        location: "Mumbai, India",
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000",
        stats: { length: "25 km", duration: "24 Months" }
    },
    {
        id: 3,
        name: "Tech Park One",
        category: "Commercial",
        client: "Innovate Builders",
        location: "Bangalore, India",
        image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=1000",
        stats: { area: "1M sq.ft", duration: "30 Months" }
    },
    {
        id: 4,
        name: "Solar Energy Farm",
        category: "Infrastructure",
        client: "Green Power Ltd",
        location: "Rajasthan, India",
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1000",
        stats: { capacity: "500 MW", duration: "12 Months" }
    },
    {
        id: 5,
        name: "Luxury Hotel Tower",
        category: "Commercial",
        client: "Grand Hosp. Grp",
        location: "Delhi, India",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1000",
        stats: { floors: "45 Floors", duration: "36 Months" }
    }
];
