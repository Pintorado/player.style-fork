import Code from './Code';
import mediaElements from '@/media-elements';

type DocsInstallProps = {
  searchParams: Record<string, string | string[]>;
};

export default async function DocsInstall({ searchParams }: DocsInstallProps) {
  const media =
    (Array.isArray(searchParams.media) ? searchParams.media[0] : searchParams.media) ?? 'video';
  const mediaElement = mediaElements[media as keyof typeof mediaElements];

  const framework =
    (Array.isArray(searchParams.framework) ? searchParams.framework[0] : searchParams.framework) ??
    'html';
  let mediaPackage =
    mediaElement.package?.[framework as keyof typeof mediaElement.package] ??
    mediaElement.package?.default as string;

  if (mediaPackage && !mediaPackage.startsWith('@')) {
    mediaPackage = mediaPackage.split('/')[0];
  }

  const installs = ['player.style'];

  if (mediaPackage) {
    installs.unshift(mediaPackage);
  }

  return (
    <div className="mb-1">
      <Code lang="bash" code={installs.map((item) => `npm install ${item}`).join('\n')} />
    </div>
  );
}
