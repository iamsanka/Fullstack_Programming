"use strict";

function getPriorityColor(priority) {
  switch (priority) {
    case 'high':
      return 'red';

    case 'medium':
      return 'yellow';

    case 'low':
      return 'green';

    default:
      return 'white';
  }
}