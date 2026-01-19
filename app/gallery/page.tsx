"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Award,
  Users,
  Film,
  SquareChevronRight,
} from "lucide-react";
import Image from "next/image";

const galleryData = {
  xenithWinners: {
    title: "Xenith 2025 Winners",
    icon: <SquareChevronRight className="w-5 h-5" />,
    items: [
      {
        type: "image",
        src: "/gallery/xenith/hack1.png",
        title: "Hack N Tech 2.0 Winner",
        description: "Winners of Hack N Tech 2.0 Hackathon 2025",
        category: "Hackathon",
      },
      {
        type: "image",
        src: "/gallery/xenith/hack2.png",
        title: "Hack N Tech 2.0 1st Runner Up",
        description: "1st Runner Up of Hack N Tech 2.0 Hackathon 2025",
        category: "Hackathon",
      },
      {
        type: "image",
        src: "/gallery/xenith/hack3.png",
        title: "Hack N Tech 2.0 2nd Runner Up",
        description: "2nd Runner Up of Hack N Tech 2.0 Hackathon 2025",
        category: "Hackathon",
      },
      {
        type: "image",
        src: "/gallery/xenith/idea1.png",
        title: "Idea Station Winner",
        description: "Winners of Idea Station 2025",
        category: "IC",
      },
      {
        type: "image",
        src: "/gallery/xenith/idea2.png",
        title: "Idea Station 1st Runner Up",
        description: "1st Runner Up of Idea Station 2025",
        category: "IC",
      },
      {
        type: "image",
        src: "/gallery/xenith/idea3.png",
        title: "Idea Station 2nd Runner Up",
        description: "2nd Runner Up of Idea Station 2025",
        category: "IC",
      },
      {
        type: "image",
        src: "/gallery/xenith/tech1.png",
        title: "Tech Hunt Winner",
        description: "Winners of Tech Hunt 2025",
        category: "tech hunt",
      },
      {
        type: "image",
        src: "/gallery/xenith/tech2.png",
        title: "Tech Hunt 1st Runner Up",
        description: "1st Runner Up of Tech Hunt 2025",
        category: "tech hunt",
      },
      {
        type: "image",
        src: "/gallery/xenith/tech3.png",
        title: "Tech Hunt 2nd Runner Up",
        description: "2nd Runner Up of Tech Hunt 2025",
        category: "tech hunt",
      },
    ],
  },
  XenithMoments: {
    title: "Xenith 2025 Moments",
    icon: <SquareChevronRight className="w-5 h-5" />,
    items: [
      {
        type: "image",
        src: "/gallery/xenith/tech1.jpg",
        title: "Tech Hunt Night Match",
        description: "Exciting moments from Tech Hunt Night Match",
        category: "Tech Hunt",
      },
      {
        type: "image",
        src: "/gallery/xenith/tech2.jpg",
        title: "Tech Hunt Planning",
        description: "Team strategizing during Tech Hunt 2025",
        category: "Tech Hunt",
      },
      {
        type: "image",
        src: "/gallery/xenith/idea1.jpg",
        title: "Idea Station Pitching",
        description: "Participants pitching their innovative ideas",
        category: "Idea Station",
      },
      {
        type: "image",
        src: "/gallery/xenith/idea2.jpg",
        title: "Idea Station Teamwork",
        description: "Collaboration in action at Idea Station 2025",
        category: "Idea Station",
      },
      {
        type: "image",
        src: "/gallery/xenith/ideateam.jpg",
        title: "Idea Station Management Team",
        description: "Meet Management team of Idea Station 2025",
        category: "Idea Station",
      },
      {
        type: "image",
        src: "/gallery/xenith/session1.jpg",
        title: "Session at Xenith 2025",
        description: "Engaging session during Xenith 2025",
        category: "session",
      },
      {
        type: "image",
        src: "/gallery/xenith/sessionmatch.jpg",
        title: "Mini Match in Session at Xenith 2025",
        description: "Interactive mini match during session at Xenith 2025",
        category: "session",
      },
      {
        type: "image",
        src: "/gallery/xenith/panel.jpg",
        title: "Mentor or Judge??",
        description: "Top mentors of IC-IITP as judges at Xenith 2025",
        category: "IC",
      },
      {
        type: "image",
        src: "/gallery/xenith/internship1.jpg",
        title: "Internship Drive at Xenith 2025",
        description: "Panel of some founders and CEO during Internship drive at Xenith 2025",
        category: "Internship",
      },
      {
        type: "image",
        src: "/gallery/xenith/internship2.jpg",
        title: "Internship Drive at Xenith 2025",
        description: "Panel of our partner companies during Internship drive at Xenith 2025",
        category: "Internship",
      },
      {
        type: "image",
        src: "/gallery/xenith/interview1.jpg",
        title: "Internship Interviews at Xenith 2025",
        description: "Students giving interviews during Internship drive at Xenith 2025",
        category: "Internship",
      },
      {
        type: "image",
        src: "/gallery/xenith/interview2.jpg",
        title: "Internship Interviews at Xenith 2025",
        description: "Students giving interviews during Internship drive at Xenith 2025",
        category: "Internship",
      },
    ],
  },
  hackNtech: {
    title: "Hack-N-Tech 2025",
    icon: <SquareChevronRight className="w-5 h-5" />,
    items: [
      {
        type: "video",
        src: "/videos/hackntech.mp4",
        title: "Hack-n-Tech Winnners",
        description: "Winners of Hack-N-Tech Hackathon 2025",
        category: "Hackathon",
      },
      {
        type: "image",
        src: "/hackNtech/img1.jpg",
        title: "Hackathon moments",
        description:
          "Experience the energy and innovation of our hackathon event",
        category: "Hackathon",
      },
      {
        type: "image",
        src: "/hackNtech/img2.jpg",
        title: "Hackathon moments",
        description: "Having questions?",
        category: "Hackathon",
      },
      {
        type: "image",
        src: "/hackNtech/img3.jpg",
        title: "Hackathon moments",
        description: "Meet some members",
        category: "Hackathon",
      },
      {
        type: "image",
        src: "/hackNtech/img4.jpg",
        title: "Hackathon moments",
        description: "Some sponsor moments from Hack-N-Tech Hackathon 2025",
        category: "Hackathon",
      },
      {
        type: "image",
        src: "/hackNtech/img5.jpg",
        title: "Hackathon moments",
        description: "Just code or having fun?",
        category: "Hackathon",
      },
      {
        type: "image",
        src: "/hackNtech/img6.jpg",
        title: "Hackathon moments",
        description: "Having fun is important!!!",
        category: "Hackathon",
      },
      {
        type: "image",
        src: "/hackNtech/img7.jpg",
        title: "Hackathon moments",
        description: "Again having fun",
        category: "Hackathon",
      },
      {
        type: "image",
        src: "/hackNtech/img8.jpg",
        title: "Hackathon moments",
        description: "Want to see all participants?",
        category: "Hackathon",
      },
      {
        type: "video",
        src: "/hackNtech/vdo1.mp4",
        title: "Hackathon moments",
        description: "Selfie time!",
        category: "Hackathon",
      },
      {
        type: "video",
        src: "/hackNtech/vdo2.mp4",
        title: "Hackathon moments",
        description: "Merchandise?",
        category: "Hackathon",
      },
      {
        type: "video",
        src: "/hackNtech/vdo3.mp4",
        title: "Hackathon moments",
        description: "Post hackathon celebration",
        category: "Hackathon",
      },
    ],
  },
  achievements: {
    title: "Hack N Tech Winners",
    icon: <Award className="w-5 h-5" />,
    items: [
      {
        type: "image",
        src: "/images/hackathon-winner.jpg",
        title: "Hackathon Winners",
        description: "Celebrating our champions of innovation",
        category: "Achievement",
      },
      {
        type: "image",
        src: "/images/hackathon-first-runner.jpg",
        title: "First Runner Up",
        description: "Excellence in technical innovation",
        category: "Achievement",
      },
      {
        type: "image",
        src: "/images/hackathon-second-runner.jpg",
        title: "Second Runner Up",
        description: "Outstanding performance in competition",
        category: "Achievement",
      },
    ],
  },
  partnerships: {
    title: "Industry Partnerships",
    icon: <Users className="w-5 h-5" />,
    items: [
      {
        type: "image",
        src: "/images/company-logos.jpg",
        title: "Industry Partners",
        description: "Collaborating with leading companies",
        category: "Partnership",
      },
    ],
  },
};

interface VideoCardProps {
  video: {
    src: string;
    title: string;
    description: string;
    category: string;
  };
  onClick: () => void;
}

const VideoCard = ({ video, onClick }: VideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Card
      className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardContent className="p-0">
        <div className="aspect-[4/3] relative overflow-hidden bg-black">
          <video
            ref={videoRef}
            src={video.src}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
          />
          <div
            className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${
              isHovered ? "opacity-0" : "opacity-100"
            } flex items-center justify-center`}
          >
            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Play
                className="w-6 h-6 text-[#0f2a4d] ml-1"
                fill="currentColor"
              />
            </div>
          </div>
          <div className="absolute top-3 right-3">
            <div className="bg-[#0f2a4d] text-white p-2 rounded-full shadow-lg">
              <Film className="w-4 h-4" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4">
            <Badge className="mb-2 bg-[#0f2a4d] hover:bg-[#1a4b8c]">
              {video.category}
            </Badge>
            <h3 className="text-white font-semibold text-base">
              {video.title}
            </h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface GalleryItem {
  type: string;
  src: string;
  title: string;
  description: string;
  category: string;
  thumbnail?: string;
}

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<GalleryItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const allImages = Object.values(galleryData).flatMap((section) =>
    section.items.filter((item) => item.type === "image")
  );

  const openImageModal = (image: GalleryItem) => {
    const index = allImages.findIndex((img) => img.src === image.src);
    setCurrentImageIndex(index);
    setSelectedImage(image);
  };

  const navigateImage = (direction: "next" | "prev") => {
    const newIndex =
      direction === "next"
        ? (currentImageIndex + 1) % allImages.length
        : currentImageIndex === 0
          ? allImages.length - 1
          : currentImageIndex - 1;

    setCurrentImageIndex(newIndex);
    setSelectedImage(allImages[newIndex]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-28 pb-12">
      {/* Hero Section */}
      <div className="text-center mb-16 px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-[#0f2a4d] mb-4 tracking-tight">
          Gallery
        </h1>
        <p className="text-lg md:text-xl text-[#1a4b8c] max-w-3xl mx-auto leading-relaxed">
          Explore our journey through captivating moments - from groundbreaking
          events and achievements to valuable partnerships and innovations
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-20">
          {Object.entries(galleryData).map(([key, section]) => (
            <div key={key}>
              {/* Section Header */}
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-gradient-to-br from-[#0f2a4d] to-[#1a4b8c] text-white rounded-xl shadow-lg">
                  {section.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-[#0f2a4d] mb-1">
                    {section.title}
                  </h2>
                  <div className="h-1 w-24 bg-gradient-to-r from-[#0f2a4d] to-[#1a4b8c] rounded-full"></div>
                </div>
              </div>

              {/* Media Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {section.items.map((item, index) => (
                  <div key={index}>
                    {item.type === "image" ? (
                      <Card
                        className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white"
                        onClick={() => openImageModal(item)}
                      >
                        <CardContent className="p-0">
                          <div className="aspect-[4/3] relative overflow-hidden">
                            <Image
                              src={item.src}
                              alt={item.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                              <Badge className="mb-2 bg-[#0f2a4d] hover:bg-[#1a4b8c] shadow-md">
                                {item.category}
                              </Badge>
                              <h3 className="text-white font-semibold text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {item.title}
                              </h3>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <VideoCard
                        video={item}
                        onClick={() => setSelectedVideo(item)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-7xl w-full h-[95vh] p-0 border-0 bg-transparent">
          <DialogTitle className="sr-only">
            {selectedImage?.title || "Image Viewer"}
          </DialogTitle>
          <div className="relative w-full h-full bg-black/95 rounded-xl overflow-hidden backdrop-blur-sm">
            {selectedImage && (
              <>
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                  priority
                />

                {/* Navigation Buttons */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md h-12 w-12 rounded-full border border-white/20 transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage("prev");
                  }}
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md h-12 w-12 rounded-full border border-white/20 transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage("next");
                  }}
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>

                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md h-12 w-12 rounded-full border border-white/20 transition-all duration-300"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="w-6 h-6" />
                </Button>

                {/* Image Counter */}
                <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                  <span className="text-white font-medium">
                    {currentImageIndex + 1} / {allImages.length}
                  </span>
                </div>

                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-8">
                  <div className="max-w-4xl">
                    <Badge className="mb-3 bg-[#0f2a4d] hover:bg-[#1a4b8c] text-sm px-3 py-1">
                      {selectedImage.category}
                    </Badge>
                    <h3 className="text-white text-2xl font-bold mb-2">
                      {selectedImage.title}
                    </h3>
                    <p className="text-gray-200 text-base">
                      {selectedImage.description}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Video Modal */}
      <Dialog
        open={!!selectedVideo}
        onOpenChange={() => setSelectedVideo(null)}
      >
        <DialogContent className="max-w-7xl w-full p-0 h-[95vh] border-0 bg-transparent">
          <DialogTitle className="sr-only">
            {selectedVideo?.title || "Video Player"}
          </DialogTitle>
          <div className="relative w-full h-full aspect-video bg-black/95 rounded-xl overflow-hidden backdrop-blur-sm">
            {selectedVideo && (
              <>
                <video
                  src={selectedVideo.src}
                  controls
                  autoPlay
                  className="w-full h-full rounded-xl"
                  controlsList="nodownload"
                >
                  Your browser does not support the video tag.
                </video>

                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md h-12 w-12 rounded-full border border-white/20 transition-all duration-300 z-50"
                  onClick={() => setSelectedVideo(null)}
                >
                  <X className="w-6 h-6" />
                </Button>

                {/* Video Info */}
                <div className="absolute bottom-12 md:bottom-16 left-0 right-0 p-4 md:p-8 pointer-events-none">
                  <div className="max-w-4xl">
                    <Badge className="mb-3 bg-[#0f2a4d] hover:bg-[#1a4b8c] text-sm px-3 py-1 pointer-events-auto">
                      {selectedVideo.category}
                    </Badge>
                    <h3 className="text-white text-2xl font-bold mb-2">
                      {selectedVideo.title}
                    </h3>
                    <p className="text-gray-200 text-base">
                      {selectedVideo.description}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryPage;
