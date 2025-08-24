import os
import shutil
from pathlib import Path

import click
from jinja2 import Environment, FileSystemLoader

TEMPLATE_DIR = Path(__file__).parent / "templates"


def copy_tree(src: Path, dst: Path, env: Environment, context: dict):
    """Recursively copy a template directory applying Jinja2 rendering."""
    for item in src.iterdir():
        target = dst / item.name
        if item.is_dir():
            target.mkdir(parents=True, exist_ok=True)
            copy_tree(item, target, env, context)
        else:
            template = env.get_template(str(item.relative_to(TEMPLATE_DIR)))
            rendered = template.render(**context)
            target.write_text(rendered)


@click.group()
def cli():
    pass


@cli.command()
@click.argument("project_name")
@click.option("--openai-key", envvar="OPENAI_API_KEY", help="OpenAI API key")
def new(project_name: str, openai_key: str):
    """Scaffold a new ChatGPT5 app project."""
    project_dir = Path(project_name).resolve()
    if project_dir.exists():
        click.echo("Directory already exists!")
        return

    shutil.copytree(TEMPLATE_DIR / "project", project_dir)

    env = Environment(loader=FileSystemLoader(str(TEMPLATE_DIR)), keep_trailing_newline=True)
    context = {"project_name": project_name, "openai_key": openai_key or "YOUR_KEY_HERE"}

    copy_tree(TEMPLATE_DIR / "project", project_dir, env, context)

    click.echo(f"Project {project_name} generated at {project_dir}")


if __name__ == "__main__":
    cli()