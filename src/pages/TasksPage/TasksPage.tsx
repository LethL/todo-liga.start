import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from 'components/index';
import { PATH_LIST } from 'constants/index';
import { Tasks } from 'modules/index';

export function TasksPage() {
  return (
    <PageContainer>
      <h1 className="text-primary text-center blue">TODO LIST</h1>
      <Tasks />
      <Link className="btn btn-primary d-block ml-auto" to={PATH_LIST.ADD}>
        Add task
      </Link>
    </PageContainer>
  );
}
