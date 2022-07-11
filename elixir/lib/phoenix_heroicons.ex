defmodule PhoenixHeroicons do
  @moduledoc """
  Elixir module for rendering HTML-safe HeroIcon SVGs
  """
  icon_tuples =
    "./optimized/**/*.svg"
    |> Path.wildcard()
    |> Enum.sort()
    |> Enum.map(&Path.relative_to_cwd/1)
    |> Enum.map(fn path ->
      contents =
        path
        |> File.read!()
        |> Floki.parse_fragment!()

      [category, name] =
        path
        |> Path.split()
        |> Enum.drop(1)

      name = String.replace_suffix(name, ".svg", "")

      {"#{category}/#{name}", contents}
    end)

  @icons Enum.into(icon_tuples, %{})

  @doc """
    Gets an HTML-safe SVG for use in a Phoenix template for the given Heroicon. The specified
    attributes will overwrite attributes on the root `svg` element.
  """
  def svg(name, attrs \\ []) do
    case Map.get(@icons, name) do
      nil ->
        nil

      icon ->
        Enum.reduce(attrs, icon, fn {key, val}, icon ->
          key = if is_atom(key), do: Atom.to_string(key), else: key
          Floki.attr(icon, "svg", key, fn _ -> val end)
        end)
        |> Floki.raw_html()
        |> Phoenix.HTML.raw()
    end
  end
end
