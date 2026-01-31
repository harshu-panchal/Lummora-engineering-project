import { Link, useNavigate } from 'react-router-dom';
import { Users, FileText, Settings, LogOut, LayoutDashboard } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    const modules = [
        { title: 'Information Management', icon: FileText, desc: 'Update website text, services, and company information.', link: '/admin/content' },
        { title: 'Team Management', icon: Users, desc: 'Add, edit, or remove team members and leadership details.', link: '/admin/team' },
        { title: 'Site Settings', icon: Settings, desc: 'Configure contact information, social links, and SEO settings.', link: '/admin/settings' },
    ];

    return (
        <div className="min-h-screen bg-black text-white flex">
            {/* Sidebar */}
            <div className="w-64 bg-[#0a0a0a] border-r border-white/10 p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-12">
                    <div className="w-8 h-8 bg-neon-blue rounded flex items-center justify-center font-bold text-black">L</div>
                    <span className="font-bold tracking-tighter text-xl">LUMMORA ADMIN</span>
                </div>

                <nav className="space-y-2 flex-grow">
                    <Link to="/admin/dashboard" className="flex items-center gap-3 p-3 bg-neon-blue/10 text-neon-blue border border-neon-blue/30 rounded-sm">
                        <LayoutDashboard size={18} />
                        <span>Dashboard</span>
                    </Link>
                    <Link to="/admin/content" className="flex items-center gap-3 p-3 text-gray-400 hover:bg-white/5 rounded-sm transition-colors">
                        <FileText size={18} />
                        <span>Content</span>
                    </Link>
                    <Link to="/admin/team" className="flex items-center gap-3 p-3 text-gray-400 hover:bg-white/5 rounded-sm transition-colors">
                        <Users size={18} />
                        <span>Team</span>
                    </Link>
                </nav>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 p-3 text-red-500 hover:bg-red-500/10 rounded-sm transition-colors mt-auto"
                >
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-grow p-10">
                <header className="mb-12">
                    <h1 className="text-4xl font-black uppercase tracking-tight mb-2">Command <span className="text-neon-blue">Center</span></h1>
                    <p className="text-gray-500">Welcome back. Manage your digital assets and corporate information.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {modules.map((module, i) => (
                        <Link
                            key={i}
                            to={module.link}
                            className="bg-[#0a0a0a] border border-white/10 p-8 hover:border-neon-blue/50 transition-all group"
                        >
                            <module.icon size={40} className="text-neon-blue mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold mb-3">{module.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{module.desc}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
