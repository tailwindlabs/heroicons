defmodule PhoenixHeroicons.MixProject do
  use Mix.Project

  def project do
    [
      app: :phoenix_heroicons,
      version: "0.1.0",
      elixir: "~> 1.7",
      deps: deps(),
      name: "PhoenixHeroicons",
      description: "Mix package to incorporate Heroicons SVGs into an Elixir Phoenix project",
      package: package(),
      elixirc_paths: ["elixir/lib"],
      lockfile: Path.expand("elixir/mix.lock", __DIR__),
      deps_path: Path.expand("elixir/deps", __DIR__),
      build_path: Path.expand("elixir/_build", __DIR__)
    ]
  end

  def application, do: []

  defp deps do
    [
      {:phoenix_html, ">= 3.0.0"},
      {:floki, ">= 0.25.0"}
    ]
  end

  defp package do
    [
      files: ["elixir/lib", "optimized"],
      licenses: ["MIT"],
      links: %{"GitHub" => "https://github.com/tailwindlabs/heroicons"},
      maintainers: [
        "Adam Wathan",
        "Andrew Morin"
      ]
    ]
  end
end
