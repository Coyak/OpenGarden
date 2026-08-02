<script lang="ts">
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import { Sprout, Leaf, TreeDeciduous, RefreshCw } from 'lucide-svelte';
  import type { Note, GraphNode, GraphLink } from '$lib/types/database.types';

  export let activeNote: Note;
  export let allNotes: Note[] = [];

  let svgElement: SVGSVGElement;
  let container: HTMLDivElement;
  let simulation: any;
  let width = 280;
  let height = 220;

  $: localNodes = buildLocalGraphNodes(activeNote, allNotes);
  $: localLinks = buildLocalGraphLinks(activeNote, allNotes);

  function buildLocalGraphNodes(current: Note, list: Note[]): GraphNode[] {
    if (!current) return [];
    
    // Active node + connected nodes
    const connectedTitles = new Set<string>();
    const wikilinkRegex = /\[\[([^\]\|]+)(?:\|([^\]]+))?\]\]/g;
    let match;
    while ((match = wikilinkRegex.exec(current.content)) !== null) {
      connectedTitles.add(match[1].trim().toLowerCase());
    }

    const connectedNotes = list.filter(n => 
      n.id !== current.id && (
        connectedTitles.has(n.title.toLowerCase()) ||
        n.content.toLowerCase().includes(current.title.toLowerCase())
      )
    );

    const nodes: GraphNode[] = [
      { id: current.id, title: current.title, slug: current.slug, stage: current.stage, val: 14 }
    ];

    connectedNotes.forEach(n => {
      nodes.push({ id: n.id, title: n.title, slug: n.slug, stage: n.stage, val: 10 });
    });

    return nodes;
  }

  function buildLocalGraphLinks(current: Note, list: Note[]): GraphLink[] {
    if (!current) return [];
    const links: GraphLink[] = [];
    
    localNodes.forEach(n => {
      if (n.id !== current.id) {
        links.push({ source: current.id, target: n.id });
      }
    });

    return links;
  }

  function initSimulation() {
    if (!svgElement || localNodes.length === 0) return;

    if (simulation) simulation.stop();

    const nodesData = localNodes.map(n => ({ ...n }));
    const linksData = localLinks.map(l => ({ 
      source: typeof l.source === 'object' ? l.source.id : l.source,
      target: typeof l.target === 'object' ? l.target.id : l.target
    }));

    const svg = d3.select(svgElement);
    svg.selectAll('*').remove();

    simulation = d3.forceSimulation(nodesData as any)
      .force('link', d3.forceLink(linksData as any).id((d: any) => d.id).distance(65))
      .force('charge', d3.forceManyBody().strength(-140))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(25));

    // Render Links
    const linkGroup = svg.append('g').attr('class', 'links');
    const linkElements = linkGroup.selectAll('line')
      .data(linksData)
      .enter()
      .append('line')
      .attr('stroke', '#38bdf8')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 1.8)
      .attr('stroke-dasharray', '3 2');

    // Render Nodes
    const nodeGroup = svg.append('g').attr('class', 'nodes');
    const nodeElements = nodeGroup.selectAll('g')
      .data(nodesData)
      .enter()
      .append('g')
      .attr('cursor', 'grab')
      .call(
        d3.drag()
          .on('start', (event, d: any) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on('drag', (event, d: any) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on('end', (event, d: any) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          }) as any
      );

    nodeElements.append('circle')
      .attr('r', (d: any) => d.val)
      .attr('fill', (d: any) => d.id === activeNote.id ? '#10b981' : '#38bdf8')
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 1.5);

    nodeElements.append('text')
      .text((d: any) => d.title.length > 16 ? d.title.slice(0, 14) + '...' : d.title)
      .attr('y', (d: any) => d.val + 12)
      .attr('text-anchor', 'middle')
      .attr('fill', '#ffffff')
      .attr('font-size', '10px')
      .attr('font-weight', '600');

    simulation.on('tick', () => {
      linkElements
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      nodeElements.attr('transform', (d: any) => `translate(${d.x}, ${d.y})`);
    });
  }

  $: if (activeNote || allNotes) {
    setTimeout(initSimulation, 50);
  }

  onMount(() => {
    initSimulation();
  });
</script>

<div class="w-full h-[220px] rounded-xl bg-garden-surface/80 border border-garden-border relative overflow-hidden flex flex-col justify-between" bind:this={container}>
  <div class="absolute top-2 left-2.5 z-10 flex items-center space-x-1.5 text-[10px] text-garden-muted font-mono bg-garden-card/80 px-2 py-0.5 rounded border border-garden-border">
    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
    <span>Grafo Local: {localNodes.length} nodos</span>
  </div>

  <button
    on:click={initSimulation}
    class="absolute top-2 right-2 z-10 p-1 rounded bg-garden-card/80 border border-garden-border text-garden-muted hover:text-white transition-colors text-xs"
    title="Reorganizar Grafo"
  >
    <RefreshCw class="w-3 h-3" />
  </button>

  <svg bind:this={svgElement} class="w-full h-full"></svg>
</div>
