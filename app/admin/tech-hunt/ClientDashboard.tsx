"use client";

import { useState } from "react";
import { 
  toggleEventStatus, 
  updateTeamStatus, 
  adjustTeamLevel, 
  clearTeamCooldown,
  generateDemoData
} from "./actions";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
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
  ArrowDown
} from "lucide-react";
import { toast } from "sonner";

export default function ClientDashboard({ initialData }: { initialData: any }) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const { settings, teams, verifications, routes } = data;

  const handleToggleEvent = async () => {
    setLoading(true);
    try {
      await toggleEventStatus(settings.techHuntActive);
      toast.success(`Event ${settings.techHuntActive ? 'Stopped' : 'Started'}!`, {
        description: "Refresh to see fully updated data."
      });
      // Simple optimistic update
      setData({
        ...data,
        settings: {
          ...settings,
          techHuntActive: !settings.techHuntActive
        }
      });
    } catch(err) {
      toast.error("Action failed.");
    }
    setLoading(false);
  };

  const handleStatusChange = async (teamId: string, status: string) => {
    try {
      await updateTeamStatus(teamId, status);
      toast.success("Team status updated.");
    } catch(err) {
      toast.error("Action failed.");
    }
  };

  const handleLevelAdjust = async (teamId: string, levelDelta: number) => {
    try {
      await adjustTeamLevel(teamId, levelDelta);
      toast.success("Team level adjusted.");
    } catch(err) {
      toast.error("Action failed.");
    }
  };

  const handleClearCooldown = async (teamId: string) => {
    try {
      await clearTeamCooldown(teamId);
      toast.success("Cooldown cleared.");
    } catch(err) {
      toast.error("Action failed.");
    }
  };

  const handleGenerateDemoData = async () => {
    setLoading(true);
    try {
      await generateDemoData();
      toast.success("Demo data generated! Refreshing page bounds.", {
        description: "Please fully refresh the page to see standard sync."
      });
      setTimeout(() => window.location.reload(), 1000);
    } catch(err) {
      toast.error("Failed to generate demo data.");
    }
    setLoading(false);
  };

  // Compute best player per team
  const getBestPlayer = (teamId: string) => {
    const teamVerifications = verifications.filter((v: any) => v.teamId === teamId && v.isValid);
    if (teamVerifications.length === 0) return "No scans yet";

    const counts: Record<string, number> = {};
    let firstScanner = teamVerifications[0].memberEmail;
    let fallbackTime = new Date(teamVerifications[0].verifiedAt).getTime();

    for (const v of teamVerifications) {
      counts[v.memberEmail] = (counts[v.memberEmail] || 0) + 1;
      const vTime = new Date(v.verifiedAt).getTime();
      if (vTime < fallbackTime) {
        fallbackTime = vTime;
        firstScanner = v.memberEmail;
      }
    }

    let topMember = "";
    let maxScans = 0;
    for (const [email, count] of Object.entries(counts)) {
      if (count > maxScans) {
        maxScans = count;
        topMember = email;
      }
    }

    return `${topMember} (${maxScans} scans)`;
  };
  
  // Predict next destination
  const getNextDestination = (team: any) => {
    if(!team.routeId || !team.routeId.levels) return "Unknown";
    const levels = team.routeId.levels;
    if (team.currentLevel > levels.length) return "Finished Route";
    const nextLevel = levels.find((l: any) => l.level === team.currentLevel);
    return nextLevel ? nextLevel.route.toUpperCase() : "Finished Route";
  };

  // Determine Leaderboard
  const sortedTeams = [...teams].sort((a: any, b: any) => {
    if (a.completed !== b.completed) return a.completed ? -1 : 1;
    if (a.completed) {
      return new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime();
    }
    return b.currentLevel - a.currentLevel; // Highest level wins
  });

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="flex justify-end mb-4">
        <Button variant="outline" onClick={handleGenerateDemoData} disabled={loading}>
          Generate Demo Data
        </Button>
      </div>
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
               disabled={loading}
            >
              {settings.techHuntActive ? <Square className="mr-2 h-4 w-4"/> : <Play className="mr-2 h-4 w-4"/>}
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
            <CardTitle className="text-sm font-medium">Total Valid Scans</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {verifications.filter((v:any) => v.isValid).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all teams
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Winner Prediction</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold truncate">
              {sortedTeams[0]?.teamName || "TBD"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Lvl: {sortedTeams[0]?.currentLevel || 0}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="teams" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none px-0 h-auto">
          <TabsTrigger value="teams" className="rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary">All Teams & Controls</TabsTrigger>
          <TabsTrigger value="leaderboard" className="rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary">Leaderboard</TabsTrigger>
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
                  <TableHead>Best Player</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teams.map((team: any) => (
                  <TableRow key={team._id}>
                    <TableCell>
                      <div className="font-semibold">{team.teamName}</div>
                      <div className="text-xs text-muted-foreground">{team.leaderEmail}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={team.status === "disqualified" ? "destructive" : team.status === "completed" ? "default" : "secondary"}>
                        {team.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Lvl {team.currentLevel}</Badge>
                        <span className="text-sm text-primary font-medium">{getNextDestination(team)}</span>
                      </div>
                      <div className="w-32 mt-2">
                         <Progress value={(team.currentLevel / (team.routeId?.totalLevels || 10)) * 100} className="h-1"/>
                      </div>
                    </TableCell>
                    <TableCell>
                      {team.cooldownUntil && new Date(team.cooldownUntil) > new Date() ? (
                        <div className="text-sm text-destructive flex items-center">
                           <AlertTriangle className="h-3 w-3 mr-1"/> Check in {Math.round((new Date(team.cooldownUntil).getTime() - Date.now())/60000)}m
                           <Button variant="ghost" size="sm" className="ml-2 h-6 px-2 text-xs" onClick={() => handleClearCooldown(team._id)}>Clear</Button>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">None</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="text-xs">{getBestPlayer(team._id)}</div>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                       <Button variant="outline" size="icon" title="Level Up" onClick={() => handleLevelAdjust(team._id, 1)}>
                         <ArrowUp className="w-4 h-4"/>
                       </Button>
                       <Button variant="outline" size="icon" title="Level Down" onClick={() => handleLevelAdjust(team._id, -1)}>
                         <ArrowDown className="w-4 h-4"/>
                       </Button>
                       <Button variant="destructive" size="icon" title="Disqualify" onClick={() => handleStatusChange(team._id, "disqualified")}>
                         <ShieldAlert className="w-4 h-4"/>
                       </Button>
                       <Button variant="default" size="sm" title="Mark Completed" onClick={() => handleStatusChange(team._id, "completed")}>
                         Finish
                       </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
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
                {sortedTeams.map((team: any, idx: number) => (
                  <TableRow key={team._id} className={idx === 0 ? "bg-primary/5" : ""}>
                    <TableCell className="font-bold">
                       {idx === 0 ? <Trophy className="w-5 h-5 text-yellow-500"/> : `#${idx + 1}`}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{team.teamName}</div>
                      <div className="text-xs text-muted-foreground text-balance">
                         Best Player: {getBestPlayer(team._id)}
                      </div>
                    </TableCell>
                    <TableCell>Level {team.currentLevel} / {team.routeId?.totalLevels || '??'}</TableCell>
                    <TableCell>
                       <Badge>{team.completed ? "Finished" : team.status}</Badge>
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