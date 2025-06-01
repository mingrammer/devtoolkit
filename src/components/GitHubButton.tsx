import { Github, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGitHubRepo } from '@/hooks/useGitHubRepo';

interface GitHubButtonProps {
  owner: string;
  repo: string;
  variant?: 'default' | 'compact';
  className?: string;
}

const GitHubButton: React.FC<GitHubButtonProps> = ({ 
  owner, 
  repo, 
  variant = 'default',
  className = '' 
}) => {
  const { stargazers_count, loading } = useGitHubRepo(owner, repo);

  const handleClick = () => {
    window.open(`https://github.com/${owner}/${repo}`, '_blank');
  };

  const formatStarCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  if (variant === 'compact') {
    return (
      <Button
        onClick={handleClick}
        variant="outline"
        size="sm"
        className={`text-gray-700 hover:text-gray-900 hover:bg-gray-50 border-gray-300 ${className}`}
      >
        <Github className="w-4 h-4 mr-2" />
        <span className="hidden sm:inline">GitHub</span>
        {!loading && stargazers_count > 0 && (
          <div className="flex items-center ml-2 text-xs">
            <Star className="w-3 h-3 mr-1 fill-current text-yellow-500" />
            {formatStarCount(stargazers_count)}
          </div>
        )}
      </Button>
    );
  }

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      size="sm"
      className={`text-gray-700 hover:text-gray-900 hover:bg-gray-50 border-gray-300 ${className}`}
    >
      <Github className="w-4 h-4 mr-2" />
      <span>GitHub</span>
      {!loading && stargazers_count > 0 && (
        <div className="flex items-center ml-2 px-2 py-1 bg-gray-100 rounded text-xs">
          <Star className="w-3 h-3 mr-1 fill-current text-yellow-500" />
          {formatStarCount(stargazers_count)}
        </div>
      )}
      {loading && (
        <div className="flex items-center ml-2 px-2 py-1 bg-gray-100 rounded text-xs">
          <div className="w-3 h-3 bg-gray-300 rounded animate-pulse mr-1"></div>
          <span className="text-gray-400">...</span>
        </div>
      )}
    </Button>
  );
};

export default GitHubButton;
