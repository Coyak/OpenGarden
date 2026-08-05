<script lang="ts">
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import { Sprout, Leaf, TreeDeciduous, Network, RefreshCw } from 'lucide-svelte';
  import type { GraphNode, GraphLink } from '$lib/types/database.types';

  let container: HTMLDivElement;
  let svgElement: SVGSVGElement;
  let activeNodeTitle: string = '';
  let activeNodeStage: string = '';

  const initialNodes: GraphNode[] = [
    { id: '1', title: 'Zettelkasten Method', slug: 'zettelkasten-method', stage: 'evergreen', val: 18 },
    { id: '2', title: 'Fleeting Notes', slug: 'fleeting-notes', stage: 'seed', val: 14 },
    { id: '3', title: 'Literature Notes', slug: 'literature-notes', stage: 'growing', val: 15 },
    { id: '4', title: 'Permanent Notes', slug: 'permanent-notes', stage: 'evergreen', val: 16 },
    { id: '5', title: 'Wikilinks [[...]]', slug: 'wikilinks', stage: 'seed', val: 12 },
    { id: '6', title: 'PARA Method', slug: 'para-method', stage: 'growing', val: 13 },
    { id: '7', title: 'Second Brain', slug: 'second-brain', stage: 'evergreen', val: 16 },
    { id: '8', title: 'Public Digital Garden', slug: 'public-digital-garden', stage: 'growing', val: 12 },
    { id: '9', title: 'Obsidian Vault Sync', slug: 'obsidian-vault-sync', stage: 'seed', val: 11 },
    { id: '10', title: 'Deep Knowledge Synthesis', slug: 'deep-knowledge-synthesis', stage: 'evergreen', val: 14 }
  ];

  const initialLinks: GraphLink[] = [
    { source: '1', target: '2' },
    { source: '1', target: '3' },
    { source: '1', target: '4' },
    { source: '2', target: '5' },
    { source: '3', target: '6' },
    { source: '4', target: '7' },
    { source: '4', target: '10' },
    { source: '5', target: '9' },
    { source: '6', target: '8' },
    { source: '7', target: '8' },
    { source: '9', target: '1' }
  ];

  let simulation: any;

  function getStageColor(stage: string): string {
    switch (stage) {
      case 'seed': return 'var(--node-seed, #10b981)';
      case 'growing': return 'var(--node-growing, #38bdf8)';
      case 'evergreen': return 'var(--node-evergreen, #a855f7)';
      default: return 'var(--accent, #6366f1)';
    }
  }

  function renderGraph() {
    if (!svgElement || !container) return;

    const width = container.clientWidth || 700;
    const height = 480;

    const nodesData = initialNodes.map(n => ({ ...n }));
    const linksData = initialLinks.map(l => ({
      source: typeof l.source === 'object' ? l.source.id : l.source,
      target: typeof l.target === 'object' ? l.target.id : l.target
    }));

    const svg = d3.select(svgElement);
    svg.selectAll('*').remove();

    // Append glow filters
    const defs = svg.append('defs');
    const filter = defs.append('filter')
      .attr('id', 'demo-glow')
      .attr('x', '-20%')
      .attr('y', '-20%')
      .attr('width', '140%')
      .attr('height', '140%');
    
    filter.append('feGaussianBlur')
      .attr('stdDeviation', '4')
      .attr('result', 'blur');
      
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'blur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    simulation = d3.forceSimulation(nodesData as any)
      .force('link', d3.forceLink(linksData as any).id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-280))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(35));

    // Render Connection Lines with visible stroke
    const linkGroup = svg.append('g').attr('class', 'links');
    const linkElements = linkGroup.selectAll('line')
      .data(linksData)
      .enter()
      .append('line')
      .attr('stroke', 'var(--accent)')
      .attr('stroke-opacity', 0.45)
      .attr('stroke-width', 2)
      .attr('class', 'd3-link-animated');

    // Render Dragable Node Groups (Obsidian Style)
    const nodeGroup = svg.append('g').attr('class', 'nodes');
    const nodeElements = nodeGroup.selectAll('g')
      .data(nodesData)
      .enter()
      .append('g')
      .attr('cursor', 'grab')
      .on('mouseenter', (event, d: any) => {
        activeNodeTitle = d.title;
        activeNodeStage = d.stage;
      })
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

    // Outer Halo
    nodeElements.append('circle')
      .attr('r', (d: any) => d.val * 1.5)
      .attr('fill', (d: any) => getStageColor(d.stage))
      .attr('opacity', 0.15);

    // Core Circle
    nodeElements.append('circle')
      .attr('r', (d: any) => d.val)
      .attr('fill', (d: any) => getStageColor(d.stage))
      .attr('filter', (d: any) => d.stage === 'evergreen' ? 'url(#demo-glow)' : null)
      .attr('stroke', 'var(--bg-main)')
      .attr('stroke-width', 2)
      .attr('class', (d: any) => d.stage === 'evergreen' ? 'node-glow' : '');

    // Text Label
    nodeElements.append('text')
      .text((d: any) => d.title)
      .attr('y', (d: any) => d.val + 18)
      .attr('text-anchor', 'middle')
      .attr('fill', 'var(--text-main)')
      .attr('opacity', 0.95)
      .attr('font-size', '11px')
      .attr('font-weight', '600')
      .attr('pointer-events', 'none');

    // Tick Simulation
    simulation.on('tick', () => {
      linkElements
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      nodeElements.attr('transform', (d: any) => `translate(${d.x}, ${d.y})`);
    });
  }

  onMount(() => {
    renderGraph();
    const handleResize = () => renderGraph();
    window.addEventListener('resize', handleResize);
    return () => {
      if (simulation) simulation.stop();
      window.removeEventListener('resize', handleResize);
    };
  });
</script>

<div class="relative w-full h-[480px] rounded-2xl notion-panel overflow-hidden shadow-xl flex flex-col justify-between" bind:this={container}>
  
  <!-- Header Overlay -->
  <div class="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
    <div class="flex items-center space-x-2 bg-garden-surface/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-garden-border text-xs text-garden-muted">
      <Network class="w-3.5 h-3.5 text-emerald-400" />
      <span>Grafo Interactivo Estilo Obsidian (Arrastra los Nodos)</span>
    </div>
    
    <div class="flex items-center space-x-3 pointer-events-auto text-xs bg-garden-surface/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-garden-border">
      <span class="flex items-center space-x-1.5">
        <Sprout class="w-3.5 h-3.5 text-emerald-400" />
        <span class="text-garden-muted">Efímera</span>
      </span>
      <span class="flex items-center space-x-1.5">
        <Leaf class="w-3.5 h-3.5 text-sky-400" />
        <span class="text-garden-muted">Literatura</span>
      </span>
      <span class="flex items-center space-x-1.5">
        <TreeDeciduous class="w-3.5 h-3.5 text-purple-400" />
        <span class="text-garden-muted">Permanente</span>
      </span>

      <button
        on:click={renderGraph}
        class="p-1 rounded hover:bg-garden-card text-garden-muted hover:text-white transition-colors"
        title="Reiniciar Simulación"
      >
        <RefreshCw class="w-3.5 h-3.5" />
      </button>
    </div>
  </div>

  <!-- Interactive SVG D3 Canvas -->
  <svg bind:this={svgElement} class="w-full h-full"></svg>

  <!-- Active Node Inspector Preview -->
  {#if activeNodeTitle}
    <div class="absolute bottom-4 left-4 right-4 bg-garden-surface/95 backdrop-blur-md p-3 rounded-xl border border-garden-border shadow-xl flex items-center justify-between text-xs animate-in fade-in slide-in-from-bottom-2">
      <div class="flex items-center space-x-2">
        <span class="font-bold text-white text-xs">{activeNodeTitle}</span>
        <span class="text-garden-muted font-mono text-[10px]">Pasa el ratón o arrastra para mover nodos</span>
      </div>
      <span class="px-2 py-0.5 rounded-md text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30">
        {activeNodeStage}
      </span>
    </div>
  {/if}
</div>
