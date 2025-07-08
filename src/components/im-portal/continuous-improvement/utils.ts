
export const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'up': return '📈';
    case 'down': return '📉';
    default: return '➡️';
  }
};

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-red-500/20 text-red-400 border-red-500';
    case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
    case 'low': return 'bg-green-500/20 text-green-400 border-green-500';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500';
  }
};

export const getImpactColor = (impact: string) => {
  switch (impact) {
    case 'high': return 'bg-purple-500/20 text-purple-400 border-purple-500';
    case 'medium': return 'bg-blue-500/20 text-blue-400 border-blue-500';
    case 'low': return 'bg-gray-500/20 text-gray-400 border-gray-500';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500';
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-yellow-500/20 text-yellow-400';
    case 'in_progress': return 'bg-blue-500/20 text-blue-400';
    case 'completed': return 'bg-green-500/20 text-green-400';
    default: return 'bg-gray-500/20 text-gray-400';
  }
};
