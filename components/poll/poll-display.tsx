"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, Clock, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  expiresAt?: Date;
  allowMultipleVotes: boolean;
  isActive: boolean;
}

interface PollDisplayProps {
  poll: Poll;
  userVotes?: string[];
  onVote?: () => void;
}

export const PollDisplay = ({ poll, userVotes = [], onVote }: PollDisplayProps) => {
  const router = useRouter();
  const [isVoting, setIsVoting] = useState(false);
  const [localVotes, setLocalVotes] = useState<string[]>(userVotes);
  const [localPoll, setLocalPoll] = useState(poll);

  const isExpired = poll.expiresAt && new Date() > new Date(poll.expiresAt);
  const isActive = poll.isActive && !isExpired;

  const handleVote = async (optionId: string) => {
    if (!isActive || isVoting) return;

    try {
      setIsVoting(true);

      // Toggle vote if already voted for this option
      if (localVotes.includes(optionId)) {
        setLocalVotes(prev => prev.filter(id => id !== optionId));
        // Here you would also call an API to remove the vote
        return;
      }

      // If multiple votes not allowed, replace all votes
      if (!poll.allowMultipleVotes) {
        setLocalVotes([optionId]);
      } else {
        setLocalVotes(prev => [...prev, optionId]);
      }

      await axios.post(`/api/polls/${poll.id}/vote`, {
        optionId,
      }, {
        withCredentials: true,
      });

      // Update local poll data
      const updatedOption = localPoll.options.find(opt => opt.id === optionId);
      if (updatedOption) {
        setLocalPoll(prev => ({
          ...prev,
          options: prev.options.map(opt => 
            opt.id === optionId 
              ? { ...opt, votes: opt.votes + 1 }
              : opt
          ),
          totalVotes: prev.totalVotes + 1,
        }));
      }

      onVote?.();
      router.refresh();
    } catch (error) {
      console.error("Error voting:", error);
      // Revert local state on error
      setLocalVotes(userVotes);
    } finally {
      setIsVoting(false);
    }
  };

  const getVotePercentage = (votes: number) => {
    if (localPoll.totalVotes === 0) return 0;
    return Math.round((votes / localPoll.totalVotes) * 100);
  };

  const getWinningOptions = () => {
    if (localPoll.options.length === 0) return [];
    const maxVotes = Math.max(...localPoll.options.map(opt => opt.votes));
    return localPoll.options.filter(opt => opt.votes === maxVotes && opt.votes > 0);
  };

  const winningOptions = getWinningOptions();

  return (
    <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4 space-y-4">
      <div className="flex items-center gap-2">
        <BarChart3 className="h-4 w-4 text-blue-500" />
        <h3 className="font-semibold text-sm">{localPoll.question}</h3>
        {isExpired && (
          <span className="text-xs text-red-500 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Expired
          </span>
        )}
      </div>

      <div className="space-y-2">
        {localPoll.options.map((option) => {
          const percentage = getVotePercentage(option.votes);
          const isVoted = localVotes.includes(option.id);
          const isWinner = winningOptions.some(win => win.id === option.id);

          return (
            <div
              key={option.id}
              className={cn(
                "relative p-3 rounded-md border cursor-pointer transition-all",
                isVoted && "border-blue-500 bg-blue-50 dark:bg-blue-900/20",
                isWinner && option.votes > 0 && "border-green-500 bg-green-50 dark:bg-green-900/20",
                !isActive && "cursor-not-allowed opacity-75"
              )}
              onClick={() => handleVote(option.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {isVoted ? (
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                  ) : (
                    <Circle className="h-4 w-4 text-gray-400" />
                  )}
                  <span className="text-sm font-medium">{option.text}</span>
                </div>
                <div className="flex items-center gap-2">
                  {isWinner && option.votes > 0 && (
                    <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                      Winner
                    </span>
                  )}
                  <span className="text-xs text-gray-500">
                    {option.votes} vote{option.votes !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
              
              <Progress 
                value={percentage} 
                className="h-2"
                style={{
                  '--progress-background': isVoted 
                    ? 'hsl(var(--blue-500))' 
                    : isWinner && option.votes > 0 
                      ? 'hsl(var(--green-500))' 
                      : 'hsl(var(--gray-300))'
                } as React.CSSProperties}
              />
              
              <span className="text-xs text-gray-500 mt-1">
                {percentage}%
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>
          {localPoll.totalVotes} total vote{localPoll.totalVotes !== 1 ? 's' : ''}
        </span>
        {poll.expiresAt && (
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {isExpired ? 'Expired' : `Expires ${new Date(poll.expiresAt).toLocaleDateString()}`}
          </span>
        )}
      </div>

      {poll.allowMultipleVotes && (
        <div className="text-xs text-gray-500">
          Multiple votes allowed
        </div>
      )}
    </div>
  );
};
