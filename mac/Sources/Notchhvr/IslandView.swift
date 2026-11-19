import SwiftUI

/// The notch island: a compact strip that opens into the full player.
struct IslandView: View {
    @ObservedObject var model: PlayerModel

    var body: some View {
        VStack(spacing: 0) {
            if model.expanded {
                expanded
                    .transition(.opacity.combined(with: .scale(scale: 0.92, anchor: .top)))
            } else {
                compact
                    .transition(.opacity)
            }
            Spacer(minLength: 0)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .top)
        .animation(.spring(response: 0.34, dampingFraction: 0.86), value: model.expanded)
        .onReceive(model.ticker) { _ in model.tick() }
        .onHover { model.hover($0) }
        .onTapGesture { model.togglePinned() }
    }

    private var compact: some View {
        HStack(spacing: 8) {
            Artwork(art: model.track.art, size: 24, radius: 6)
            VStack(alignment: .leading, spacing: 0) {
                Text(model.track.title)
                    .font(.system(size: 10.5, weight: .semibold))
                    .lineLimit(1)
                Text(model.track.artist)
                    .font(.system(size: 8.5))
                    .foregroundStyle(.white.opacity(0.55))
                    .lineLimit(1)
            }
            Spacer(minLength: 4)
            Equalizer(active: model.playing)
            Text(model.elapsed)
                .font(.system(size: 9, weight: .medium).monospacedDigit())
                .foregroundStyle(.white.opacity(0.5))
        }
        .foregroundStyle(.white)
        .padding(.horizontal, 8)
        .padding(.vertical, 6)
        .frame(height: 38)
        .background(
            RoundedRectangle(cornerRadius: 19, style: .continuous)
                .fill(Color.black.opacity(0.94))
        )
        .overlay(
            RoundedRectangle(cornerRadius: 19, style: .continuous)
                .strokeBorder(.white.opacity(0.07), lineWidth: 0.6)
        )
        .padding(.horizontal, 2)
    }

    private var expanded: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(spacing: 12) {
                Artwork(art: model.track.art, size: 54, radius: 12)
                VStack(alignment: .leading, spacing: 2) {
                    Text(model.track.title)
                        .font(.system(size: 13, weight: .semibold))
                        .lineLimit(1)
                    Text(model.track.artist)
                        .font(.system(size: 10.5))
                        .foregroundStyle(.white.opacity(0.6))
                    Text(model.track.album)
                        .font(.system(size: 9))
                        .foregroundStyle(.white.opacity(0.35))
                }
                Spacer(minLength: 0)
                Equalizer(active: model.playing)
                    .scaleEffect(1.2)
            }

            VStack(spacing: 4) {
                GeometryReader { geo in
                    ZStack(alignment: .leading) {
                        Capsule().fill(.white.opacity(0.14))
                        Capsule()
                            .fill(.white.opacity(0.92))
                            .frame(width: max(2, geo.size.width * model.fraction))
                    }
                }
                .frame(height: 3)
                HStack {
                    Text(model.elapsed)
                    Spacer()
                    Text(model.remaining)
                }
                .font(.system(size: 8.5).monospacedDigit())
                .foregroundStyle(.white.opacity(0.45))
            }

            HStack(spacing: 18) {
                Button {
                    model.previous()
                } label: {
                    Image(systemName: "backward.fill")
                }
                Button {
                    model.toggle()
                } label: {
                    Image(systemName: model.playing ? "pause.fill" : "play.fill")
                        .font(.system(size: 15))
                }
                Button {
                    model.next()
                } label: {
                    Image(systemName: "forward.fill")
                }
                Spacer()
                Label("18°", systemImage: "cloud.rain")
                    .labelStyle(.titleAndIcon)
                    .font(.system(size: 10))
                Label("86%", systemImage: "airpods")
                    .font(.system(size: 10))
            }
            .buttonStyle(.borderless)
            .foregroundStyle(.white.opacity(0.9))
            .font(.system(size: 12))
        }
        .padding(14)
        .frame(width: 392)
        .background(
            RoundedRectangle(cornerRadius: 26, style: .continuous)
                .fill(Color.black.opacity(0.95))
        )
        .overlay(
            RoundedRectangle(cornerRadius: 26, style: .continuous)
                .strokeBorder(.white.opacity(0.08), lineWidth: 0.6)
        )
        .shadow(color: .black.opacity(0.4), radius: 22, y: 10)
    }
}
