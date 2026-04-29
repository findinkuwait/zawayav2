'use client';

const items = [
    'INTERIOR FIT-OUT',
    'RETAIL SPACE DESIGN',
    'HOSPITALITY INTERIORS',
    'PROJECT MANAGEMENT',
    'ZAWAYA INTERNATIONAL',
];

export default function MarqueeSection() {
    const repeated = [...items, ...items, ...items, ...items];

    return (
        <div className="bg-primary overflow-hidden py-4 select-none" aria-hidden="true">
            <div className="flex gap-12 animate-marquee whitespace-nowrap">
                {repeated.map((item, i) => (
                    <span key={i} className="flex items-center gap-12 shrink-0">
                        <span className="text-[11px] font-body font-medium tracking-[0.25em] text-white/70 uppercase">
                            {item}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                    </span>
                ))}
            </div>
        </div>
    );
}
