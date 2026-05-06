import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Users, Settings, Trash2 } from "lucide-react";

interface WingCardProps {
  wing: {
    id: string;
    name: string;
    description: string;
    clubCount: number;
    memberCount: number;
  };
  basePath?: string;
  onEdit?: (wing: any) => void;
  onDelete?: (wingId: string) => void;
  showActions?: boolean;
}

const getWingLogo = (wingId: string) => {
  switch(wingId) {
    case 'tatva':
      return '/images/tatva_nobg.png';
    case 'disha':
      return '/images/disha-logo.png';
    case 'arthniti':
      return '/images/arthniti-logo.png';
    case 'management':
      return '/images/stc-logo.jpg'; // Fallback to STC logo for management
    default:
      return '/images/stc-logo.jpg';
  }
};

export default function WingCard({ wing, basePath = "/wings", onEdit, onDelete, showActions = false }: WingCardProps) {
  const cardContent = (
    <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-indigo-200/40 via-transparent to-slate-300/40 hover:from-indigo-300/60 hover:to-slate-400/60 transition-all duration-300">
      
      <div className="relative rounded-3xl bg-white/80 backdrop-blur-xl p-6 h-full flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.06)] group-hover:shadow-[0_12px_40px_rgba(79,70,229,0.15)] transition-all duration-300">

        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-indigo-500/5 to-transparent" />

        {/* Top */}
        <div className="flex items-start justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-md overflow-hidden">
              <Image 
                src={getWingLogo(wing.id)}
                alt={`${wing.name} Logo`}
                width={48}
                height={48}
                className="object-contain"
              />
            </div>

            <h3 className="text-lg font-semibold text-slate-900 tracking-tight">
              {wing.name}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">
              {wing.clubCount} clubs
            </div>
            
            {showActions && (
              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onEdit?.(wing);
                  }}
                  className="p-2 rounded-lg bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors"
                  title="Edit"
                >
                  <Settings className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDelete?.(wing.id);
                  }}
                  className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Middle */}
        <p className="text-sm text-slate-600 leading-relaxed mt-4 line-clamp-2 relative z-10">
          {wing.description}
        </p>

        {/* Bottom */}
        <div className="flex items-center justify-between mt-6 relative z-10">
          <div className="flex items-center text-sm text-slate-500 gap-1.5">
            <Users className="w-4 h-4" />
            <span>{wing.memberCount} members</span>
          </div>

          {!showActions && (
            <span className="text-sm font-medium text-indigo-600 group-hover:translate-x-1 transition-transform">
              Explore →
            </span>
          )}
        </div>

      </div>
    </div>
  );

  if (showActions) {
    return (
      <div className="group block">
        <Link href={`${basePath}/${wing.id}`} className="block">
          {cardContent}
        </Link>
      </div>
    );
  }

  return (
    <Link href={`${basePath}/${wing.id}`} className="group block">
      {cardContent}
    </Link>
  );
}