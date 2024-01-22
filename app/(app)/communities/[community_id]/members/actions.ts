'use server';

import { redirect } from 'next/navigation';

export const redirectToMembersPage = ({
  community_id,
}: {
  community_id: string;
}) => {
  redirect(`/communities/${community_id}/members`);
};
