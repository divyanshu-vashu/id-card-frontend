import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { api, UserProfile } from "@/lib/api";
import { authStorage } from "@/lib/auth";
import { LogOut, Mail, Phone, Calendar } from "lucide-react";

const Home = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const token = authStorage.getToken();
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const profile = await api.getUserProfile(token);
        setUser(profile);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load profile. Please login again.",
          variant: "destructive",
        });
        authStorage.clear();
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate, toast]);

  const handleLogout = () => {
    authStorage.clear();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const initials = (user.name || '')
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto p-4 py-8">
        <div className="flex justify-end mb-6">
          <Button
            variant="outline"
            onClick={handleLogout}
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, {(user.name || 'User').split(' ')[0]}!</h1>
          <p className="text-muted-foreground">Your digital identity card</p>
        </div>

        <Card className="overflow-hidden shadow-[var(--shadow-elevated)] border-0">
          <div className="relative h-32 bg-gradient-to-br from-primary via-primary to-accent">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
          </div>

          <div className="relative px-6 pb-6">
            <div className="flex flex-col sm:flex-row gap-6 -mt-16 relative z-10">
              <div className="flex-shrink-0 mx-auto sm:mx-0">
                <div className="w-32 h-32 rounded-2xl bg-card border-4 border-background shadow-[var(--shadow-card)] flex items-center justify-center">
                  <span className="text-4xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                    {initials}
                  </span>
                </div>
              </div>

              <div className="flex-1 mt-4 sm:mt-16 text-center sm:text-left">
              <h2 className="text-2xl font-bold mb-1">{user.name || 'Anonymous User'}</h2>
                <p className="text-muted-foreground mb-4">Member ID: {(user.id || '').slice(0, 8)}</p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-foreground/80 justify-center sm:justify-start">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <span>{user.email || 'No email provided'}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-foreground/80 justify-center sm:justify-start">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10">
                      <Phone className="w-4 h-4 text-accent" />
                    </div>
                    <span>{user.phone || 'No phone provided'}</span>
                  </div>

                  {user.createdAt && (
                    <div className="flex items-center gap-3 text-sm text-foreground/80 justify-center sm:justify-start">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <span>Member since {new Date(user.createdAt).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
          <h3 className="font-semibold mb-2 text-lg">Quick Stats</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-card">
              <p className="text-2xl font-bold text-primary">Active</p>
              <p className="text-xs text-muted-foreground mt-1">Status</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-card">
              <p className="text-2xl font-bold text-accent">Verified</p>
              <p className="text-xs text-muted-foreground mt-1">Account</p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
