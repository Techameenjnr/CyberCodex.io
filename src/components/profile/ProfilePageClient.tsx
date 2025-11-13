"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Card } from "@/components/ui";
import { Edit2, User } from "lucide-react";
import { EditProfileModal } from "./EditProfileModal";

interface ProfilePageClientProps {
  userData: any;
  followerCount: number;
  followingCount: number;
  stats: Array<{
    label: string;
    value: string | number;
    color: string;
  }>;
}

export function ProfilePageClient({
  userData,
  followerCount,
  followingCount,
  stats,
}: ProfilePageClientProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "projects" | "posts">("overview");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Banner Section */}
      <div className="relative overflow-hidden rounded-t-xl">
        {userData.banner ? (
          <Image
            src={userData.banner}
            alt="Profile banner"
            width={1200}
            height={300}
            className="w-full h-[300px] object-cover"
            priority
          />
        ) : (
          <div className="w-full h-[300px] bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500" />
        )}
      </div>

      {/* Profile Header */}
      <div className="relative bg-cyber-dark border-x border-cyber-border px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          {/* Profile Picture & Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            {/* Profile Picture */}
            <div className="relative -mt-16">
              {userData.image ? (
                <Image
                  src={userData.image}
                  alt={userData.name || "User"}
                  width={140}
                  height={140}
                  className="w-[140px] h-[140px] rounded-full border-4 border-cyber-dark bg-cyber-dark shadow-lg"
                />
              ) : (
                <div className="w-[140px] h-[140px] rounded-full border-4 border-cyber-dark bg-gradient-to-br from-cyber-primary/20 to-cyber-secondary/20 flex items-center justify-center shadow-lg">
                  <span className="text-5xl">👤</span>
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="pb-4">
              <h1 className="text-3xl font-bold text-cyber-text-primary mb-1">
                {userData.name}
              </h1>
              <p className="text-cyber-text-secondary mb-3">
                @{userData.username || "user"}
              </p>
              <p className="text-sm text-cyber-text-muted flex items-center gap-1">
                <User size={14} />
                Joined {formatDate(userData.createdAt)}
              </p>
            </div>
          </div>

          {/* Edit Profile Button */}
          <div className="pb-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsEditModalOpen(true)}
              className="flex items-center gap-2"
            >
              <Edit2 size={16} />
              Edit profile
            </Button>
          </div>
        </div>

        {/* Follower Counts */}
        <div className="flex items-center gap-4 pb-4 text-sm">
          <button className="hover:underline">
            <span className="font-bold text-cyber-text-primary">{followerCount}</span>{" "}
            <span className="text-cyber-text-secondary">Followers</span>
          </button>
          <button className="hover:underline">
            <span className="font-bold text-cyber-text-primary">{followingCount}</span>{" "}
            <span className="text-cyber-text-secondary">Following</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Left Column - Content */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="flex gap-8 border-b border-cyber-border mb-6">
            <button
              onClick={() => setActiveTab("overview")}
              className={`pb-3 font-medium transition-colors relative ${
                activeTab === "overview"
                  ? "text-cyber-text-primary"
                  : "text-cyber-text-secondary hover:text-cyber-text-primary"
              }`}
            >
              Overview
              {activeTab === "overview" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyber-primary" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`pb-3 font-medium transition-colors relative ${
                activeTab === "projects"
                  ? "text-cyber-text-primary"
                  : "text-cyber-text-secondary hover:text-cyber-text-primary"
              }`}
            >
              Projects
              {activeTab === "projects" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyber-primary" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("posts")}
              className={`pb-3 font-medium transition-colors relative ${
                activeTab === "posts"
                  ? "text-cyber-text-primary"
                  : "text-cyber-text-secondary hover:text-cyber-text-primary"
              }`}
            >
              Posts
              {activeTab === "posts" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyber-primary" />
              )}
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div>
              <h2 className="text-2xl font-bold text-cyber-text-primary mb-4">Projects</h2>
              <Card className="p-8 text-center border-cyber-border bg-cyber-dark-secondary">
                <p className="text-cyber-text-secondary">
                  You don&apos;t have any projects yet. Add one to the{" "}
                  <Link href="/projects" className="text-cyber-primary hover:underline">
                    Project Showcase
                  </Link>
                  !
                </p>
              </Card>
            </div>
          )}

          {activeTab === "projects" && (
            <Card className="p-8 text-center border-cyber-border bg-cyber-dark-secondary">
              <p className="text-cyber-text-secondary">
                You don&apos;t have any projects yet. Add one to the Project Showcase!
              </p>
            </Card>
          )}

          {activeTab === "posts" && (
            <Card className="p-8 text-center border-cyber-border bg-cyber-dark-secondary">
              <p className="text-cyber-text-secondary">No posts yet.</p>
            </Card>
          )}
        </div>

        {/* Right Column - Stats Sidebar */}
        <div className="space-y-6">
          {/* Level & Stats Card */}
          <Card className="p-6 border-cyber-border bg-cyber-dark-secondary">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyber-primary to-cyber-secondary flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <div>
                <p className="font-bold text-cyber-text-primary">{userData.username}</p>
                <p className="text-sm text-cyber-text-secondary">Level {userData.level}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">⚡</span>
                  <span className="text-sm font-medium text-cyber-text-secondary">Total XP</span>
                </div>
                <p className="text-2xl font-bold text-cyber-primary">{userData.totalXp}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">🏆</span>
                  <span className="text-sm font-medium text-cyber-text-secondary">Rank</span>
                </div>
                <p className="text-lg font-bold text-cyber-secondary">{userData.rank}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">💎</span>
                  <span className="text-sm font-medium text-cyber-text-secondary">Badges</span>
                </div>
                <p className="text-2xl font-bold text-cyber-text-primary">{userData.badges.length}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">🔥</span>
                  <span className="text-sm font-medium text-cyber-text-secondary">Day streak</span>
                </div>
                <p className="text-2xl font-bold text-cyber-text-primary">{userData.streak}</p>
              </div>
            </div>
          </Card>

          {/* Achievements Card */}
          <Card className="p-6 border-cyber-border bg-cyber-dark-secondary">
            <h3 className="text-lg font-bold text-cyber-text-primary mb-4">Achievements</h3>
            <p className="text-sm text-cyber-text-secondary mb-4">
              Want to earn your first achievement? Complete an entire course to receive a course badge!
            </p>
            <Button variant="primary" size="sm" className="w-full" asChild>
              <Link href="/courses">Explore courses</Link>
            </Button>
          </Card>

          {/* Skills Card */}
          <Card className="p-6 border-cyber-border bg-cyber-dark-secondary">
            <h3 className="text-lg font-bold text-cyber-text-primary mb-4">Skills</h3>
            <p className="text-sm text-cyber-text-secondary mb-4">
              You haven&apos;t listed any skills yet.
            </p>
            <Button variant="ghost" size="sm" className="w-full border border-cyber-border">
              <Edit2 size={16} className="mr-2" />
              Add skills
            </Button>
          </Card>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userData={userData}
      />
    </div>
  );
}
