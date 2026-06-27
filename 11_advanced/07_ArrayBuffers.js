// ---------------------------------------------------------------------------------
// 📑 REGIME 1: THE JAVASCRIPT BINARY TYPOLOGY SPEC
// ---------------------------------------------------------------------------------
// * 1. ARRAYBUFFER: A completely raw, fixed-length allocation pool of continuous bytes.
//      Provides zero native programmatic read/write APIs. Must be wrapped in a view.
// * 2. TYPEDARRAYS: Homogeneous array views (Uint8Array, Int32Array, Float64Array).
//      Enforces a single data type layout across the entire buffer based on host CPU Endianness.
// * 3. DATAVIEW: A heterogeneous low-level view layout. Enables random byte-offset access
//      to read/write mixed primitives while explicitly dictating Endianness overrides.

// ---------------------------------------------------------------------------------
// 🧪 PRODUCTION CASE STUDY: NETWORK BINARY PACKET PARSING SCRIPT
// ---------------------------------------------------------------------------------
// Simulation Description: Decodes an incoming binary network stream containing 
// mixed header architectures (packet id, timestamp, payload arrays).

class BinaryPacketParser {
    constructor() {
        // Define packet constraints based on system blueprint
        this.HEADER_SIZE_BYTES = 8; // 2 bytes ID, 2 bytes length, 4 bytes timestamp
    }

    /**
     * Translates an incoming network buffer into a structured JavaScript record
     * @param {ArrayBuffer} rawPacketBuffer 
     */
    deserializeNetworkPacket(rawPacketBuffer) {
        // Instantiate a DataView to process variable data types safely across memory offsets
        const packetView = new DataView(rawPacketBuffer);
        
        // 1. Read Packet ID (Unsigned 16-bit Int, Offset: 0, Explicit Little-Endian = true)
        const packetId = packetView.getUint16(0, true);
        
        // 2. Read Payload Length (Unsigned 16-bit Int, Offset: 2, Explicit Little-Endian = true)
        const payloadLength = packetView.getUint16(2, true);
        
        // 3. Read Unix Timestamp (Unsigned 32-bit Int, Offset: 4, Explicit Little-Endian = true)
        const timestamp = packetView.getUint32(4, true);

        // 4. Extract Homogeneous Payload (Fast extraction using TypedArray slice over buffer offset)
        // Slice memory starting right after the 8-byte header block up to the designated length
        const rawPayloadView = new Uint8Array(rawPacketBuffer, this.HEADER_SIZE_BYTES, payloadLength);
        
        return {
            meta: { packetId, timestamp, length: payloadLength },
            data: Array.from(rawPayloadView)
        };
    }

    /**
     * Compiles data into an un-fragmented binary payload packet for socket dispatch
     */
    serializeOutboundPacket(packetId, dataArray) {
        const payloadLength = dataArray.length;
        const totalAllocationSize = this.HEADER_SIZE_BYTES + payloadLength;
        
        const outputBuffer = new ArrayBuffer(totalAllocationSize);
        const writeView = new DataView(outputBuffer);

        // Populate header block
        writeView.setUint16(0, packetId, true);
        writeView.setUint16(2, payloadLength, true);
        writeView.setUint32(4, Math.floor(Date.now() / 1000), true);

        // Populate payload block using a direct TypedArray overlay
        const payloadTargetView = new Uint8Array(outputBuffer, this.HEADER_SIZE_BYTES, payloadLength);
        for (let i = 0; i < payloadLength; i++) {
            payloadTargetView[i] = dataArray[i];
        }

        return outputBuffer;
    }
}

// ---------------------------------------------------------------------------------
// 📑 REGIME 2: THE BIT-LEVEL ADDRESSING REFERENCE TABLE
// ---------------------------------------------------------------------------------
// * Int8Array      -> 1 Byte Per Element  (Range: -128 to 127)
// * Uint8Array     -> 1 Byte Per Element  (Range: 0 to 255)
// * Uint8ClampedArray -> 1 Byte Per Element (Forces out-of-bounds inputs to stay within 0-255)
// * Int16Array     -> 2 Bytes Per Element (Range: -32,768 to 32,767)
// * Int32Array     -> 4 Bytes Per Element (Range: -2,147,483,648 to 2,147,483,647)
// * Float32Array   -> 4 Bytes Per Element (IEEE 754 Floating-Point Decimal Values)
// * Float64Array   -> 8 Bytes Per Element (Double-precision Decimal Values)

// ---------------------------------------------------------------------------------
// 🚨 PERFORMANCE ARCHITECTURE WARNING: DATA COPIES VS VIEW BUFFER SLICING
// ---------------------------------------------------------------------------------
// * INCORRECT PATTERN: Creating sub-arrays via data mapping loops or restructuring 
//   cloners duplicates byte allocations across memory sectors, causing heap bloat.
// * CORRECT PATTERN: Always pass the single root ArrayBuffer reference between modules, 
//   and customize local views by defining varying byte offsets inside constructor configs:
//   e.g., new Float32Array(sharedBuffer, specificOffsetBytes, elementCount)
// =================================================================================