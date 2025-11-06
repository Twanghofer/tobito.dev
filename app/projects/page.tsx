import {
  ArrowLeft,
  ChefHat,
  LucideProps,
  Sparkles,
  Star,
  Timer,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects - tobito.dev",
  description: "Projects I've worked on",
};

const apps = [
  {
    name: "Travo",
    href: "https://travoapp.com",
    backgroundColor: "bg-[#2094F3]",
    favorite: true,
    icon: (props: LucideProps) => (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <mask
          id="mask0_3450_1860"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="3"
          y="2"
          width="17"
          height="20"
        >
          <path
            d="M3.83521 2.22064H19.9999V21.7794H3.83521V2.22064Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask0_3450_1860)">
          <path
            d="M3.83521 5.18257V5.14699C3.85204 5.13651 3.86539 5.11872 3.87587 5.09362C4.43662 3.73576 5.58861 2.54056 7.08848 2.30387C8.47239 2.08529 9.82199 2.78424 10.6537 3.87332C11.1957 4.5837 11.5481 5.36208 11.7114 6.20875C11.7257 6.28405 11.7403 6.28437 11.7555 6.20907C11.9239 5.36494 12.2642 4.60086 12.7763 3.91716C13.522 2.92212 14.714 2.23842 15.9791 2.25876C17.8545 2.28894 19.2781 3.48064 20.0075 5.14413C20.011 5.15112 20.0101 5.15716 20.005 5.16288C19.9999 5.1686 19.9936 5.1705 19.9863 5.16796C19.5828 5.04564 19.1694 4.95732 18.7466 4.90363C18.0149 4.81023 17.261 4.84772 16.4845 5.01578C16.442 5.02499 16.4162 4.98052 16.3949 4.94906C16.123 4.54908 15.8158 4.16593 15.4736 3.7993C15.4641 3.78913 15.452 3.78437 15.438 3.785C15.424 3.78595 15.4126 3.79199 15.4043 3.80311C15.3993 3.8101 15.3983 3.82471 15.4018 3.84695C15.4758 4.31938 15.5626 4.78608 15.6611 5.24739C15.6626 5.25406 15.6604 5.25882 15.6547 5.26232C15.6493 5.26581 15.6436 5.26581 15.6382 5.26168C15.1613 4.89442 14.5948 4.58784 14.0007 4.47791C13.9775 4.47378 13.9601 4.48172 13.9483 4.50206C13.9366 4.52239 13.9382 4.54145 13.9531 4.55924L14.7038 5.45516C14.7295 5.48598 14.7222 5.50091 14.6822 5.50059C14.4674 5.49742 14.2342 5.4882 14.029 5.52029C13.4222 5.61401 12.9009 5.88152 12.4653 6.32249C12.4459 6.34219 12.4497 6.34918 12.4764 6.34346C12.505 6.33774 12.5444 6.32757 12.5949 6.31296C13.0861 6.17317 13.6309 6.08453 14.2304 6.04768C14.9389 6.00352 15.6016 6.05467 16.218 6.20018C17.0761 6.40255 17.797 6.81652 18.3809 7.44207C19.2244 8.3453 19.7016 9.61008 19.7661 10.8348C19.8033 11.5344 19.7365 12.2251 19.5666 12.9069C19.565 12.9113 19.5621 12.9135 19.5577 12.9142C19.5529 12.9145 19.5497 12.9126 19.5481 12.9081C19.1453 11.9633 18.5922 11.1169 17.8881 10.3694C17.8783 10.3592 17.8735 10.3475 17.8732 10.3338C17.8716 10.2696 17.8926 10.1896 17.898 10.1438C17.9453 9.72223 17.9466 9.29936 17.9018 8.87491C17.9002 8.85871 17.8913 8.84886 17.8754 8.84568C17.8592 8.84251 17.8475 8.84791 17.8399 8.86221L17.267 9.90205C17.2632 9.90903 17.2569 9.91316 17.2486 9.91348C17.2404 9.91412 17.2337 9.91094 17.2289 9.90427C16.9484 9.50587 16.6243 9.14687 16.2561 8.82694C16.2453 8.81741 16.239 8.80565 16.237 8.79104C16.1141 7.7925 15.3271 7.06147 14.4001 6.78094C14.3022 6.75171 14.1888 6.72629 14.0598 6.705C13.9448 6.68562 13.8298 6.6691 13.7148 6.65513C13.6999 6.65385 13.6903 6.66021 13.6865 6.67514C13.683 6.68975 13.6881 6.69992 13.7021 6.70596C14.6603 7.09228 15.3472 7.94532 15.5607 8.95815C15.6804 9.52716 15.649 10.1575 15.5368 10.7379C15.5241 10.8043 15.5035 10.8065 15.4755 10.7452C15.0511 9.81563 14.2228 8.98293 13.2208 8.6522C13.2087 8.64807 13.2062 8.64108 13.2135 8.6306L13.8371 7.73627C13.8454 7.72419 13.8463 7.71149 13.8397 7.69814C13.8241 7.66733 13.7939 7.65907 13.7488 7.67368C13.312 7.81442 12.9269 8.04126 12.593 8.35483C12.5727 8.3739 12.5552 8.3866 12.5406 8.39328C12.5161 8.4044 12.4955 8.40376 12.4783 8.39137C12.4666 8.38279 12.4548 8.38279 12.443 8.39073C12.431 8.39868 12.4268 8.4098 12.4303 8.42346C12.6521 9.29968 12.8265 10.1804 12.9533 11.0648C12.9904 11.3244 13.0213 11.5846 13.0451 11.8457C13.054 11.9455 13.0858 12.1206 13.0816 12.2651C13.0784 12.3557 13.1112 12.4319 13.1124 12.518C13.1163 12.8297 13.1547 13.1572 13.1553 13.4463C13.1569 13.9391 13.1566 14.4325 13.1547 14.9256C13.1528 15.3459 13.102 15.9864 13.0025 16.8467C12.8074 18.5293 12.4345 20.1673 11.8836 21.7612C11.8772 21.7797 11.8642 21.7889 11.8448 21.7892L9.98688 21.7962C9.94844 21.7962 9.937 21.7787 9.95257 21.7438C10.6865 20.099 11.198 18.3764 11.5153 16.6078C11.7886 15.0825 11.9271 13.5931 11.93 12.139C11.9325 11.0181 11.8585 9.90236 11.7076 8.79199C11.6866 8.63854 11.6618 8.48605 11.6326 8.33418C11.63 8.32052 11.6234 8.31798 11.6122 8.32656L11.5134 8.40598C11.5039 8.41393 11.4941 8.41424 11.4842 8.40662C11.4467 8.37707 11.3918 8.33132 11.3193 8.26969C11.0604 8.04762 10.7637 7.87097 10.4288 7.74008C10.3602 7.71307 10.2846 7.70005 10.2125 7.67654C10.1943 7.67019 10.1794 7.67463 10.168 7.6902C10.1565 7.70545 10.1562 7.72102 10.167 7.73658L10.756 8.60709C10.7691 8.62583 10.7646 8.6395 10.7427 8.64744C9.74765 9.00898 8.94259 9.83501 8.50099 10.7878C8.49686 10.7964 8.4905 10.7999 8.48129 10.7989C8.47208 10.798 8.46636 10.7929 8.46445 10.7837C8.28368 9.92651 8.29925 9.03027 8.67128 8.23252C9.0055 7.51578 9.53956 7.00555 10.2741 6.70215C10.2862 6.6977 10.2906 6.68912 10.2881 6.67641C10.2852 6.6637 10.2773 6.65798 10.2646 6.65894C9.05855 6.70818 7.94469 7.54024 7.77631 8.78087C7.77408 8.7939 7.76836 8.80502 7.75852 8.8136C7.37981 9.13448 7.04718 9.49697 6.76093 9.90141C6.7568 9.90745 6.75108 9.91031 6.74377 9.90999C6.73647 9.90967 6.73106 9.90649 6.72757 9.90014C6.54426 9.58974 6.36952 9.27204 6.20273 8.94671C6.19923 8.93972 6.19319 8.92511 6.1843 8.90224C6.17572 8.87968 6.16555 8.86634 6.15412 8.86252C6.11758 8.84981 6.09661 8.86284 6.09153 8.90096C6.02481 9.38832 6.06008 9.82611 6.109 10.3122C6.11091 10.3338 6.10456 10.3519 6.09026 10.3675C5.38972 11.1033 4.84264 11.942 4.44901 12.884C4.44519 12.8926 4.44233 12.9002 4.44011 12.9072C4.43757 12.9142 4.4328 12.9177 4.42518 12.9174C4.41755 12.9167 4.41311 12.9129 4.41152 12.9056C4.21581 12.1387 4.16244 11.3193 4.22789 10.5606C4.24663 10.3417 4.29301 10.0787 4.36672 9.77052C4.53097 9.0811 4.81436 8.44538 5.21721 7.86335C6.00956 6.7174 7.23304 6.14648 8.60075 6.05149C9.43535 5.99367 10.2518 6.07754 11.0509 6.30311C11.0569 6.30533 11.0617 6.30343 11.0648 6.29771C11.068 6.29231 11.0671 6.28723 11.0623 6.2831C10.6417 5.88819 10.1562 5.63848 9.60596 5.53427C9.33337 5.48249 9.02107 5.49075 8.73227 5.50091C8.70908 5.50155 8.70432 5.49265 8.7183 5.47391C8.93211 5.18384 9.15482 4.89696 9.38642 4.61325C9.40898 4.58593 9.43122 4.54685 9.45346 4.4957C9.45854 4.48426 9.45505 4.47759 9.44298 4.47569C9.38706 4.4652 9.34067 4.4652 9.3035 4.47569C8.7542 4.6285 8.26176 4.89251 7.82619 5.26835C7.81761 5.27598 7.80839 5.27693 7.79855 5.27153C7.78838 5.26581 7.78457 5.25755 7.78647 5.24643L8.01871 3.81741C8.02126 3.80057 8.0149 3.78786 7.99965 3.77992C7.98472 3.77197 7.97074 3.77388 7.95835 3.78564C7.92213 3.82027 7.88528 3.85934 7.84811 3.90223C7.54184 4.25711 7.2683 4.632 7.02716 5.0269C7.01604 5.04501 7.00048 5.05105 6.98046 5.04501C5.93458 4.7416 4.90046 4.82198 3.83521 5.18257Z"
            fill="white"
          />
        </g>
      </svg>
    ),
  },
  {
    name: "MyRecipes",
    href: "/apps/recipes",
    icon: ChefHat,
    backgroundColor: "from-orange-500 to-red-500",
    favorite: false,
    vibeCoded: true,
  },
  {
    name: "Interval Timer",
    href: "/tools/interval-timer",
    icon: Timer,
    backgroundColor: "from-blue-500 to-cyan-500",
    favorite: false,
    vibeCoded: true,
  },
];

// Sort apps: favorites first, then regular, then vibe coded last
const sortedApps = [...apps].sort((a, b) => {
  if (a.favorite && !b.favorite) return -1;
  if (!a.favorite && b.favorite) return 1;
  if (!a.vibeCoded && b.vibeCoded) return -1;
  if (a.vibeCoded && !b.vibeCoded) return 1;
  return 0;
});

export default function Projects() {
  const vibeCodedApps = apps.filter((app) => app.vibeCoded);
  const favoriteApps = apps.filter((app) => app.favorite);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 md:px-6 py-16 max-w-4xl">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </Link>
          <h1 className="text-4xl leading-tight md:text-6xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Projects
          </h1>
        </div>

        {/* Legend */}
        <div className="mt-5 flex flex-col gap-2">
          {favoriteApps.length > 0 && (
            <div className="flex items-center gap-2 text-base text-muted-foreground">
              <Star
                className="size-4 fill-yellow-500 text-yellow-500"
                aria-label="Star"
              />
              <span>
                <b>Favorite</b> — projects I'm particularly proud of
              </span>
            </div>
          )}
          {vibeCodedApps.length > 0 && (
            <div className="flex items-center gap-2 text-base text-muted-foreground">
              <Sparkles className="size-4" aria-label="Sparkles" />
              <span>
                <b>Vibe coded</b> — quick experiments and prototypes
              </span>
            </div>
          )}
        </div>

        <div className="grid mt-10 grid-cols-3 gap-2 lg:gap-4 sm:grid-cols-[repeat(auto-fill,minmax(min(10rem,19%),1fr))] justify-items-center">
          {sortedApps.map((app) => {
            const Icon = app.icon;
            return (
              <div
                key={app.href}
                className="group relative w-full flex flex-col  gap-2 transition-transform duration-300 hover:scale-105 active:scale-95"
              >
                <div className="px-2 lg:px-4">
                  <div
                    aria-hidden="true"
                    className={`relative w-full aspect-square bg-gradient-to-br ${app.backgroundColor} rounded-3xl lg:rounded-4xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:rounded-3xl duration-300`}
                  >
                    <Icon className="size-7/12 text-white" />
                    {app.favorite && (
                      <div className="absolute top-2.5 border-2 right-2.5 translate-x-1/2 -translate-y-1/2 size-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Star className="size-5 fill-yellow-500 text-yellow-500" />
                      </div>
                    )}
                    {app.vibeCoded && (
                      <div
                        className={`absolute top-2.5 border-2 ${app.favorite ? "left-2.5 -translate-x-1/2" : "right-2.5 translate-x-1/2"} -translate-y-1/2 size-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center`}
                      >
                        <Sparkles className="size-5 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </div>

                <Link
                  href={app.href}
                  className="text-base sm:text-lg font-medium text-foreground group-hover:text-primary transition-colors text-center"
                >
                  <h2 className="truncate">{app.name}</h2>

                  {app.favorite && <span className="sr-only">- Favorite</span>}
                  {app.vibeCoded && (
                    <span className="sr-only">- Vibe coded</span>
                  )}
                </Link>

                <Link
                  href={app.href}
                  className="absolute inset-0"
                  aria-hidden="true"
                  tabIndex={-1}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
