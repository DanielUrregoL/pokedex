import type { Pokemon } from '../interfaces'


export function PokemonStats({ stats }: { stats: Pokemon['stats'] }) {
  return (
    <div className="flex-1">
      <h3 className="text-2xl font-semibold my-10">Base Stats</h3>
      <div className="space-y-2">
        {stats.map((stat) => (
          <div key={stat.stat.name}>
            <div className="flex justify-between text-sm my-2">
              <span className="capitalize">{stat.stat.name.replace('-', ' ')}</span>
              <span>{stat.base_stat}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className={`h-3 rounded-full ${
                  stat.base_stat >= 90
                    ? 'bg-green-500'
                    : stat.base_stat <= 40
                      ? 'bg-red-500'
                      : 'bg-yellow-400'
                }`}
                style={{
                  width: `${(stat.base_stat / 150) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
