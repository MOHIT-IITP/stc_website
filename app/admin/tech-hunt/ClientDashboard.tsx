"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  toggleEventStatus,
  updateTeamStatus,
  adjustTeamLevel,
  clearTeamCooldown,
} from "./actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Trophy,
  Users,
  Timer,
  AlertTriangle,
  Activity,
  Play,
  Square,
  ShieldAlert,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { toast } from "sonner";

export default function ClientDashboard({ initialData }: { initialData: any }) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<any | null>(null);
  const [isPending, startTransition] = useTransition();
  const progressSectionRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const { settings, teams, verifications, routes } = data;

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const normalizeId = (value: any) => {
    if (!value) return "";
    if (typeof value === "string") return value;
    if (value.$oid) return String(value.$oid);
    if (typeof value.toString === "function") return value.toString();
    return String(value);
  };

  const rankedTeams = [...teams]
    .sort((a: any, b: any) => {
      if (a.completed !== b.completed) return a.completed ? -1 : 1;
      if (a.completed) {
        return (
          new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime()
        );
      }
      return b.currentLevel - a.currentLevel;
    })
    .map((team: any, index: number) => ({
      ...team,
      displayRank: index + 1,
    }));

  const handleToggleEvent = async () => {
    setLoading(true);
    try {
      await toggleEventStatus(settings.techHuntActive);
      toast.success(
        `Event ${settings.techHuntActive ? "Stopped" : "Started"}!`,
        {
          description: "Refresh to see fully updated data.",
        },
      );
      // Simple optimistic update
      setData({
        ...data,
        settings: {
          ...settings,
          techHuntActive: !settings.techHuntActive,
        },
      });
    } catch (err) {
      toast.error("Action failed.");
    }
    setLoading(false);
  };

  const handleStatusChange = async (teamId: string, status: string) => {
    try {
      await updateTeamStatus(teamId, status);
      toast.success("Team status updated.");
      startTransition(() => {
        router.refresh();
      });
    } catch (err) {
      toast.error("Action failed.");
    }
  };

  const handleLevelAdjust = async (teamId: string, levelDelta: number) => {
    try {
      await adjustTeamLevel(teamId, levelDelta);
      toast.success("Team level adjusted.");
      startTransition(() => {
        router.refresh();
      });
    } catch (err) {
      toast.error("Action failed.");
    }
  };

  const handleClearCooldown = async (teamId: string) => {
    try {
      await clearTeamCooldown(teamId);
      startTransition(() => {
        router.refresh();
      });
    } catch (err) {
      toast.error("Action failed.");
    }
  };

  // Predict next destination
  const getNextDestination = (team: any) => {
    if (team.completed) return "Finished all levels";
    if (!team.routeId || !team.routeId.levels) return "Unknown";
    const levels = team.routeId.levels;
    if (team.currentLevel > levels.length) return "Finished Route";
    const nextLevel = levels.find((l: any) => l.level === team.currentLevel);
    return nextLevel ? nextLevel.route.toUpperCase() : "Finished Route";
  };

  // Determine Leaderboard
  const sortedTeams = [...teams].sort((a: any, b: any) => {
    if (a.completed !== b.completed) return a.completed ? -1 : 1;
    if (a.completed) {
      return (
        new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime()
      );
    }
    return b.currentLevel - a.currentLevel; // Highest level wins
  });

  const getMemberProgress = (team: any) => {
    const teamId = normalizeId(team._id);
    const teamVerifications = verifications.filter(
      (v: any) => normalizeId(v.teamId) === teamId && v.isValid,
    );

    const routeTotalLevels =
      team.routeId?.totalLevels || team.routeId?.levels?.length || 0;
    const levelUnderVerification = Math.min(
      team.currentLevel || 1,
      routeTotalLevels || team.currentLevel || 1,
    );
    const hasCompletedRoute = Boolean(
      team.completed || team.currentLevel > routeTotalLevels,
    );

    return team.members.map((member: any) => {
      const memberEmail = String(member.email || "").toLowerCase();
      const memberScans = teamVerifications.filter(
        (v: any) => String(v.memberEmail || "").toLowerCase() === memberEmail,
      );

      const scannedLevels = memberScans
        .reduce((acc: number[], scan: any) => {
          const level = Number(scan.level);
          if (Number.isFinite(level) && level > 0 && !acc.includes(level)) {
            acc.push(level);
          }
          return acc;
        }, [])
        .sort((a: number, b: number) => a - b);

      const highestScannedLevel = scannedLevels.length
        ? scannedLevels[scannedLevels.length - 1]
        : 0;

      return {
        ...member,
        scannedLevels,
        highestScannedLevel,
        hasScannedCurrentLevel:
          hasCompletedRoute || scannedLevels.includes(levelUnderVerification),
      };
    });
  };

  const handleSelectTeam = (team: any) => {
    setSelectedTeam(team);
  };

  useEffect(() => {
    if (!selectedTeam || !progressSectionRef.current) return;
    progressSectionRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [selectedTeam]);

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Event Status</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {settings.techHuntActive ? (
                <span className="text-green-500">Active</span>
              ) : (
                <span className="text-destructive">Inactive</span>
              )}
            </div>
            <Button
              variant={settings.techHuntActive ? "destructive" : "default"}
              size="sm"
              className="mt-4 w-full"
              onClick={handleToggleEvent}
              disabled={loading || isPending}
            >
              {settings.techHuntActive ? (
                <Square className="mr-2 h-4 w-4" />
              ) : (
                <Play className="mr-2 h-4 w-4" />
              )}
              {settings.techHuntActive ? "Stop Hunt" : "Start Hunt"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Teams</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teams.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Registered for Hunt
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Valid Scans
            </CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {verifications.filter((v: any) => v.isValid).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all teams
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Winner Prediction
            </CardTitle>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold truncate">
              {rankedTeams[0]?.teamName || "TBD"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Lvl: {rankedTeams[0]?.currentLevel || 0}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="teams" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none px-0 h-auto">
          <TabsTrigger
            value="teams"
            className="rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            All Teams & Controls
          </TabsTrigger>
          <TabsTrigger
            value="leaderboard"
            className="rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Leaderboard
          </TabsTrigger>
        </TabsList>

        <TabsContent value="teams" className="mt-6 space-y-4">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Level / Next Dest</TableHead>
                  <TableHead>Cooldown</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rankedTeams.map((team: any) => (
                  <TableRow
                    key={team._id}
                    className={`${selectedTeam && normalizeId(selectedTeam._id) === normalizeId(team._id) ? "bg-muted/40" : ""}`}
                  >
                    <TableCell>
                      <div className="font-semibold">{team.teamName}</div>
                      <div className="text-xs text-muted-foreground">
                        {team.leaderEmail}
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                        <Badge variant="outline">
                          Rank #{team.displayRank}
                        </Badge>
                        {team.completed ? (
                          <Badge className="bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/10">
                            Cleared all levels
                          </Badge>
                        ) : null}
                      </div>
                      <button
                        type="button"
                        className="mt-2 cursor-pointer text-xs font-medium text-primary hover:underline"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleSelectTeam(team);
                        }}
                      >
                        View Progress
                      </button>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          team.status === "disqualified"
                            ? "destructive"
                            : team.status === "completed"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {team.completed ? "completed all levels" : team.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Lvl {team.currentLevel}</Badge>
                        <span className="text-sm text-primary font-medium">
                          {getNextDestination(team)}
                        </span>
                      </div>
                      <div className="w-32 mt-2">
                        <Progress
                          value={
                            (team.currentLevel /
                              (team.routeId?.totalLevels || 10)) *
                            100
                          }
                          className="h-1"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      {team.cooldownUntil &&
                        new Date(team.cooldownUntil) > new Date() ? (
                        <div className="text-sm text-destructive flex items-center">
                          <AlertTriangle className="h-3 w-3 mr-1" /> Check in{" "}
                          {Math.round(
                            (new Date(team.cooldownUntil).getTime() -
                              Date.now()) /
                            60000,
                          )}
                          m
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-2 h-6 px-2 text-xs"
                            onClick={(event) => {
                              event.stopPropagation();
                              handleClearCooldown(team._id);
                            }}
                          >
                            Clear
                          </Button>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">
                          None
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        title="Level Up"
                        disabled={isPending}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleLevelAdjust(team._id, 1);
                        }}
                      >
                        <ArrowUp className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        title="Level Down"
                        disabled={isPending}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleLevelAdjust(team._id, -1);
                        }}
                      >
                        <ArrowDown className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        title="Disqualify"
                        disabled={isPending}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleStatusChange(team._id, "disqualified");
                        }}
                      >
                        <ShieldAlert className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        title="Mark Completed"
                        disabled={isPending}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleStatusChange(team._id, "completed");
                        }}
                      >
                        Finish
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {selectedTeam ? (
            <Card ref={progressSectionRef}>
              <CardHeader>
                <CardTitle>Team Member Progress</CardTitle>
                <CardDescription>
                  {selectedTeam.teamName} • Level {selectedTeam.currentLevel} •
                  Next: {getNextDestination(selectedTeam)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {getMemberProgress(selectedTeam).map((member: any) => (
                  <div key={member.email} className="rounded-lg border p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {member.email}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline">
                          Highest Level:{" "}
                          {member.highestScannedLevel || "Not started"}
                        </Badge>
                        <Badge
                          variant={
                            member.hasScannedCurrentLevel
                              ? "default"
                              : "destructive"
                          }
                        >
                          {selectedTeam.completed
                            ? "Scanned every location"
                            : member.hasScannedCurrentLevel
                              ? `Scanned L${selectedTeam.currentLevel}`
                              : `Pending L${selectedTeam.currentLevel}`}
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      {member.scannedLevels.length > 0
                        ? `Scanned levels: ${member.scannedLevels.join(", ")}`
                        : "No verification scans yet"}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-6 text-sm text-muted-foreground">
                Click any team row to view member-wise level progress.
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="leaderboard" className="mt-6">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Rank</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Current Level</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rankedTeams.map((team: any, idx: number) => (
                  <TableRow
                    key={team._id}
                    className={idx === 0 ? "bg-primary/5" : ""}
                  >
                    <TableCell className="font-bold">
                      {team.displayRank === 1 ? (
                        <Trophy className="w-5 h-5 text-yellow-500" />
                      ) : (
                        `#${team.displayRank}`
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{team.teamName}</div>
                    </TableCell>
                    <TableCell>
                      {team.completed
                        ? `Cleared all ${team.routeId?.totalLevels || "??"} levels`
                        : `Level ${team.currentLevel} / ${team.routeId?.totalLevels || "??"}`}
                    </TableCell>
                    <TableCell>
                      <Badge>
                        {team.completed ? "Finished all levels" : team.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
