import { MessageDetail } from '@/lib/types/database/public/messages';
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { getAuthUser } from '@/lib/state/auth';
import { isAdmin, isModerator } from '@/lib/utils/memberRole';
import { MoreMessageOptions } from './message-actions/dropdown-menu';

const MessageCard: React.FC<{ message: MessageDetail; refProp: any }> = ({
  message,
  refProp,
}) => {
  const supabase = createClientComponentClient();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getAuthUser(supabase).then((user) => {
      setUser(user);
    });
  }, [supabase]);

  return (
    <div
      key={message.id}
      ref={refProp}
      className="px-6 pt-2 pb-2 grid grid-cols-[25px_1fr_min-content] items-start last:mb-0 last:pb-0"
    >
      <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
      <div className="space-y-1">
        <div className="flex items-baseline gap-2">
          <p className="text-sm font-medium leading-none">
            {message.sender.user.name}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">{message.content}</p>
      </div>
      <div className="">
        <MoreMessageOptions
          message_id={message.id}
          isAdmin={isAdmin(message.sender.role)}
          isModerator={isModerator(message.sender.role)}
          isSender={message.sender.user.id === user?.id}
        />
      </div>
    </div>
  );
};

export default MessageCard;
