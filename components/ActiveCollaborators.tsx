import { useOthers } from '@liveblocks/react/suspense';
import Image from 'next/image';

const ActiveCollaborators = () => {
  const others = useOthers();

  const collaborators = others.map((other) => other.info);

  return (
    <ul className="collaborators-list">
      {collaborators.map(({ id, avatar, name, color }) => (
        <li key={id} className="transition-all duration-300 hover:scale-110 hover:-translate-y-1 animate-in fade-in zoom-in-50 z-50">
          <Image
            src={avatar}
            alt={name}
            width={100}
            height={100}
            className='inline-block size-8 rounded-full ring-2 ring-dark-100 shadow-sm'
            style={{ border: `3px solid ${color}` }}
          />
        </li>
      ))}
    </ul>
  )
}

export default ActiveCollaborators