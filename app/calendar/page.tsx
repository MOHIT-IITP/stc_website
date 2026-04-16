"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { toIndianDateString, toIndianDateTimeString } from "@/lib/formatDate";
import Link from "next/link";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface Event {
  _id: string;
  title: string;
  content: string;
  club: string;
  eventDate: string;
  expireAt?: string;
  imageUrl?: string;
  redirectLink?: string;
  redirectLabel?: string;
  isImportant?: boolean;
  createdAt: string;
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events");
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const getEventsForDate = (date: Date): Event[] => {
    return events.filter((event) => {
      const eventDate = new Date(event.eventDate);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const getDaysInMonth = (date: Date): (Date | null)[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const handleDateClick = (date: Date | null) => {
    if (!date) return;
    const dayEvents = getEventsForDate(date);
    if (dayEvents.length > 0) {
      setSelectedDate(date);
      setSelectedEvents(dayEvents);
      setDialogOpen(true);
    }
  };

  const isToday = (date: Date | null): boolean => {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isExpired = (event: Event): boolean => {
    const expireDate = event.expireAt
      ? new Date(event.expireAt)
      : new Date(event.eventDate);
    return expireDate < new Date();
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-30 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-[#0f2a4d] mb-4 flex items-center justify-center gap-3">
            <CalendarIcon className="w-12 h-12" />
            Events Calendar
          </h1>
          <p className="text-xl text-[#1a4b8c]">
            View all upcoming events and activities
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-[#1a4b8c]" />
          </div>
        ) : (
          <Card className="shadow-2xl">
            <CardContent className="p-6">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <Button
                  onClick={handlePrevMonth}
                  variant="outline"
                  size="icon"
                  className="hover:bg-[#0f2a4d] hover:text-white"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>

                <h2 className="text-3xl font-bold text-[#0f2a4d]">
                  {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>

                <Button
                  onClick={handleNextMonth}
                  variant="outline"
                  size="icon"
                  className="hover:bg-[#0f2a4d] hover:text-white"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>

              {/* Days of Week */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {DAYS.map((day) => (
                  <div
                    key={day}
                    className="text-center font-semibold text-[#0f2a4d] py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {days.map((date, index) => {
                  const dayEvents = date ? getEventsForDate(date) : [];
                  const hasEvents = dayEvents.length > 0;
                  const today = isToday(date);

                  return (
                    <div
                      key={index}
                      onClick={() => handleDateClick(date)}
                      className={`min-h-[100px] p-2 border rounded-lg transition-all duration-200 ${!date ? "bg-gray-50" : "bg-white hover:shadow-lg cursor-pointer"} ${today ? "ring-2 ring-[#1a4b8c] bg-blue-50" : ""} ${hasEvents ? "hover:bg-blue-50" : ""}`}
                    >
                      {date && (
                        <>
                          <div
                            className={`text-sm font-semibold mb-1 ${today ? "text-[#1a4b8c]" : "text-gray-700"}`}
                          >
                            {date.getDate()}
                          </div>

                          {hasEvents && (
                            <div className="space-y-1">
                              {dayEvents.slice(0, 2).map((event, idx) => (
                                <div
                                  key={idx}
                                  className={`text-xs p-1 rounded truncate ${event.isImportant ? "bg-red-100 text-red-800 font-semibold" : "bg-[#0f2a4d] text-white"} ${isExpired(event) ? "opacity-50" : ""}`}
                                  title={event.title}
                                >
                                  {event.title}
                                </div>
                              ))}
                              {dayEvents.length > 2 && (
                                <div className="text-xs text-[#1a4b8c] font-semibold">
                                  +{dayEvents.length - 2} more
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-blue-50 ring-2 ring-[#1a4b8c]"></div>
                  <span className="text-gray-600">Today</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-[#0f2a4d]"></div>
                  <span className="text-gray-600">Event</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-red-100"></div>
                  <span className="text-gray-600">Important Event</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto w-[95vw]">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#0f2a4d]">
              Events on {selectedDate && toIndianDateString(selectedDate)}
            </DialogTitle>
            <DialogDescription>
              {selectedEvents.length} event
              {selectedEvents.length !== 1 ? "s" : ""} scheduled
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {selectedEvents.map((event, index) => (
              <Card
                key={index}
                className={`overflow-hidden ${isExpired(event) ? "opacity-60" : ""}`}
              >
                {event.imageUrl && (
                  <div className="relative w-full aspect-video">
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      className="object-contain"
                    />
                    {event.isImportant && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                        IMPORTANT
                      </div>
                    )}
                    {event.redirectLink && (
                      <Link href={event.redirectLink} rel="noopener noreferrer">
                      <div className="absolute top-13 right-2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                        {event.redirectLabel || "Learn More"}
                      </div>
                      </Link>
                    )}
                    {isExpired(event) && (
                      <div className="absolute top-2 left-2 bg-gray-600 text-white text-xs px-3 py-1 rounded-full">
                        EXPIRED
                      </div>
                    )}
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-[#0f2a4d] mb-3">
                    {event.title}
                  </h3>

                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {event.content}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-[#1a4b8c]">
                      <MapPin className="w-4 h-4" />
                      <span className="font-semibold">Club:</span>
                      <span>{event.club}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[#1a4b8c]">
                      <Clock className="w-4 h-4" />
                      <span className="font-semibold">Event Date:</span>
                      <span>{toIndianDateString(event.eventDate)}</span>
                    </div>

                    {event.expireAt && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span className="font-semibold">Event till:</span>
                        <span>{toIndianDateString(event.expireAt)}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 text-xs text-gray-500">
                    Posted on {toIndianDateTimeString(event.createdAt)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-4">
            <Button
              onClick={() => setDialogOpen(false)}
              className="w-full bg-[#0f2a4d] hover:bg-[#1a4b8c]"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
