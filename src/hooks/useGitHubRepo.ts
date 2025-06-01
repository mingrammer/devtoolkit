import { useState, useEffect } from 'react';

interface GitHubRepoInfo {
  stargazers_count: number;
  forks_count: number;
  loading: boolean;
  error: string | null;
}

export const useGitHubRepo = (owner: string, repo: string) => {
  const [repoInfo, setRepoInfo] = useState<GitHubRepoInfo>({
    stargazers_count: 0,
    forks_count: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchRepoInfo = async () => {
      try {
        setRepoInfo(prev => ({ ...prev, loading: true, error: null }));
        
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch repository info');
        }
        
        const data = await response.json();
        
        setRepoInfo({
          stargazers_count: data.stargazers_count || 0,
          forks_count: data.forks_count || 0,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.warn('GitHub API error:', error);
        setRepoInfo({
          stargazers_count: 0,
          forks_count: 0,
          loading: false,
          error: 'Failed to load repo info',
        });
      }
    };

    fetchRepoInfo();
  }, [owner, repo]);

  return repoInfo;
};
