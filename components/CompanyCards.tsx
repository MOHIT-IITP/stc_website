"use client"
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { useState } from 'react'
import { MapPin } from 'lucide-react'

interface Company {
  name: string;
  category: string;
  positions: string;
  image: string;
}

interface CompanyCardsProps {
  company: Company[];
}

const CompanyCards = ({ company: internshipCompanies }: CompanyCardsProps) => {
  const getCategoryColor = (category: string) => {
    // Using a consistent blue color palette that matches the website's theme
    const colors = {
      'EdTech': 'bg-blue-50 text-blue-700 border border-blue-100',
      'IT Services': 'bg-blue-50 text-blue-700 border border-blue-100', 
      'Analytics': 'bg-blue-50 text-blue-700 border border-blue-100',
      'HR Tech': 'bg-blue-50 text-blue-700 border border-blue-100',
      'Consulting': 'bg-blue-50 text-blue-700 border border-blue-100',
      'Training': 'bg-blue-50 text-blue-700 border border-blue-100',
      'Manufacturing': 'bg-blue-50 text-blue-700 border border-blue-100',
      'Media': 'bg-blue-50 text-blue-700 border border-blue-100',
      'Real Estate': 'bg-blue-50 text-blue-700 border border-blue-100',
      'FinTech': 'bg-blue-50 text-blue-700 border border-blue-100',
      'Fashion Tech': 'bg-blue-50 text-blue-700 border border-blue-100',
      'E-commerce': 'bg-blue-50 text-blue-700 border border-blue-100',
      'AgriTech': 'bg-blue-50 text-blue-700 border border-blue-100',
    };
    return colors[category as keyof typeof colors] || 'bg-blue-50 text-blue-700 border border-blue-100';
  };

  return (
    <div className="mt-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {internshipCompanies.map((company: Company, index: number) => (
          <Card 
            key={index} 
            className="group cursor-pointer border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 bg-white hover:bg-gray-50"
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                {/* Company Logo */}
                <div className="w-14 h-14 rounded-full bg-white p-1 border border-gray-100 shadow-sm flex-shrink-0">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
                    <img 
                      src={company.image} 
                      alt={company.name}
                      className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1 leading-tight">
                    {company.name}
                  </h4>
                  
                  {/* Category badge */}
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(company.category)}`}>
                    <span className="truncate">{company.category}</span>
                  </div>
                </div>
              </div>

              {/* Positions */}
              <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                <b>Roles:</b> {company.positions}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default CompanyCards