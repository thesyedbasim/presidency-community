import { MessageDetail } from '@/lib/types/database/public/messages';
import { isAdmin, isModerator } from '@/lib/utils/memberRole';
import { MoreMessageOptions } from './message-actions/dropdown-menu';
import { MemberDetail } from '@/lib/types/database/public/members';

const MessageCard: React.FC<{
  message: MessageDetail;
  authMember: MemberDetail | null;
  refProp: any;
}> = ({ message, authMember, refProp }) => {
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
          message={message}
          isAdmin={{
            sender: isAdmin(message.sender.role),
            authUser: isAdmin(authMember ? authMember.role : 'member'),
          }}
          isModerator={{
            sender: isModerator(message.sender.role),
            authUser: isModerator(authMember ? authMember.role : 'member'),
          }}
          isSender={message.sender_id === authMember?.id}
        />
      </div>
    </div>
  );
};

export default MessageCard;
