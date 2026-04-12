import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
}

export default function ServiceCard({ title, description, icon: Icon }: ServiceCardProps) {
    return (
        <div className="group bg-white p-11 md:p-10 border border-border rounded-lg shadow-[0_18px_45px_rgba(26,26,26,0.08)] hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(26,26,26,0.13)] transition-all duration-300 cursor-pointer flex flex-col items-start gap-9 md:gap-7">
            <div className="p-5 md:p-4 bg-alternate rounded-lg group-hover:bg-accent group-hover:text-white transition-colors duration-300 text-primary">
                <Icon size={40} />
            </div>
            <div>
                <h3 className="text-2xl font-bold font-en-heading font-ar-heading mb-4 text-primary leading-tight">{title}</h3>
                <p className="text-secondary leading-relaxed font-en-body font-ar-body">{description}</p>
            </div>
        </div>
    );
}
